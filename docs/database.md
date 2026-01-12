# Database

## Schema

```mermaid

erDiagram

stations {
  id Uuid
  name Text
  description Text
  is_mobile Boolean
  position Geography
}

instruments {
  id Uuid
  identifier Text
  model_id Uuid
}

models {
  id Uuid
  name String
  version String
  program String
}

sessions {
  id Uuid
  start_at DateTime
  end_at DateTime
  user_id Uuid
}

datasets {
  id Uuid
  sync Boolean
  instrument_id Uuid
}

measures {
  id Uuid
  recorded_at DateTime
  position Geography
  parameters Json
  instrument_id Uuid
  session_id Uuid
  dataset_id Uuid
}

stations ||--|{ instruments : has
models ||--|{ instruments : defines
stations ||--|{ sessions : has
sessions ||--|{ datasets : has
datasets ||--|{ instruments : has
measures ||--|{ datasets : has
measures ||--|{ sessions : has
measures ||--|{ instruments : has
```
