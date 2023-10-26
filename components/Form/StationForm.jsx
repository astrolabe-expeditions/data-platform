'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/Input/Input'
import { Select } from '../ui/Select/Select'
import { Button } from '../ui/Button/Button'
import { useTranslations as getTranslations } from 'next-intl'
import { PageHeader } from '@/components/Page/PageHeader'



export default function StationForm({sensors}) {

  const t = getTranslations('Station')

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    sensors: [],
    longitude: '',
    latitude: '',
    description: '',
    image_URL: '',
  })

  const handleChange = (inputName) => (evt) => {
    setFormData({
      ...formData,
      [inputName]: evt.target.value,
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    signIn('credentials', {
      ...formData,
      callbackUrl: '/',
    })
  }

  return (
    <>

      <PageHeader title={t('title')} className={'inline-flex pl-5'} />
      
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <Input 
              name = "name"
              label={t('labels.name')}
              value={formData.name}
              onChange={handleChange('name')}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <Select
              name="type"
              label={t('labels.type')}
              value={formData.type}
              onChange={handleChange('type')}
            >
              <option>-- Choisir type --</option>
              <option value="fixe">Fixe</option>
              <option value="mobile">Mobile</option>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <Select
              name="sensors"
              label={t('labels.sensors')}
              value={formData.sensors}
              onChange={handleChange('sensors')}
            >
              {sensors.map((s)=>(
                <option value={s.id}>{s.identifier}</option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <Input
              name="latitude"
              label={t('labels.latitude')}
              value={formData.latitude}
              onChange={handleChange('latitude')}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <Input
              name="longitude"
              label={t('labels.longitude')}
              value={formData.longitude}
              onChange={handleChange('longitude')}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <Input
              name="description"
              label={t('labels.description')}
              value={formData.description}
              onChange={handleChange('description')}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <Input
              name="image_URL"
              label={t('labels.image_URL')}
              value={formData.image_URL}
              onChange={handleChange('image_URL')}
            />
          </div>
        </div>
        <Button type='submit' label={t('addStation')} />
      </form>
    </>

  )
}

export { StationForm }
