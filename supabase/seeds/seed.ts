import { createSeedClient } from '@snaplet/seed';
import { copycat } from '@snaplet/copycat';
import bcrypt from 'bcryptjs';

const hashPassword = async (password: string) => {
  const saltRounds = 6;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const main = async () => {
  const seed = await createSeedClient({ dryRun: true });

  // Truncate all tables in the database
  await seed.$resetDatabase();

  const authenticatedUser = {
    instance_id: '00000000-0000-0000-0000-000000000000',
    aud: 'authenticated',
    role: 'authenticated',
    email_confirmed_at: new Date(),
    raw_app_meta_data: {
      provider: 'email',
      providers: ['email'],
    },
    raw_user_meta_data: {
      email_verified: true,
    },
    banned_until: null,
  };

  await seed.users([
    {
      email: 'anita.conti@astrolabe-expeditions.org',
      encrypted_password: await hashPassword('password'),
      ...authenticatedUser,
    },
    {
      email: 'jacques-yves.cousteau@astrolabe-expeditions.org',
      encrypted_password: await hashPassword('password'),
      ...authenticatedUser,
    },
  ]);

  const defaultModels = [
    {
      code: 'CTD',
      name: 'Sonde conductitité, température et pression',
    },
    {
      code: 'TSG',
      name: 'Thermosalinographe de surface',
    },
    {
      code: 'MD',
      name: 'Détecteur de muons',
    },
    {
      code: 'GNSS',
      name: 'Positionnement GNSS et altimètre acoustique',
    },
  ];

  const { models } = await seed.models(
    defaultModels.map((model) => ({
      ...model,
      deleted_at: null,
    })),
  );

  const { stations } = await seed.stations((x) =>
    x(10, ({ seed, index }) => {
      const isMobile = copycat.bool(seed);

      return {
        name: isMobile ? `Voilier ${copycat.word(seed)}` : `Bouée n°${index}`,
        is_mobile: isMobile,
        position: null,
        deleted_at: null,
      };
    }),
  );

  for (const station of stations) {
    const numberOfInstruments = station.is_mobile ? 1 : 3;
    const { instruments } = await seed.instruments((x) =>
      x(numberOfInstruments, ({ seed }) => ({
        serial_number: `OSO-${copycat.int(seed, { min: 1000, max: 9999 })}`,
        model_id: copycat.oneOf(seed, models).id,
        deleted_at: null,
      })),
    );

    await seed.station_has_instruments(
      instruments.map((instrument) => ({
        station_id: station.id,
        instrument_id: instrument.id,
      })),
    );
  }

  process.exit();
};

main();
