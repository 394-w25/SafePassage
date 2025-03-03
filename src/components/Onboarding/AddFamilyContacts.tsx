import { CustomAutocomplete, CustomInputField } from '@/components/common/UI'
import { useHealthHistory } from '@/context'
import { emergencyContactRelationships } from '@/utils/onboardingUtils'
import EditableList from './EditableList'

const AddFamilyContacts = () => {
  const { contacts, addContact, updateContact, removeContact } = useHealthHistory()

  return (
    <EditableList
      title="Emergency Contacts"
      description="Emergency contacts will be notified in case of an emergency."
      items={contacts}
      addItem={addContact}
      removeItem={removeContact}
    >
      {contact => (
        <>
          <CustomInputField
            label="Name"
            value={contact.name}
            onChange={value => updateContact(contact.id, 'name', value)}
          />
          <CustomAutocomplete
            label="Relationship"
            value={contact.relationship}
            onChange={value => updateContact(contact.id, 'relationship', value)}
            options={emergencyContactRelationships}
          />
          <CustomInputField
            label="Phone number"
            type="tel"
            value={contact.phone}
            onChange={value => updateContact(contact.id, 'phone', value)}
          />
        </>
      )}
    </EditableList>
  )
}

export default AddFamilyContacts
