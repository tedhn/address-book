import { Modal, Button, TextInput } from "@mantine/core";
import { ContactType } from "../types";
import { useState } from "react";

interface AddressModalProps {
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  contacts: ContactType[];
  setContacts: (contact: ContactType[]) => void;
  form: ContactType;
  setForm: (form: ContactType) => void;
  editIndex: number | null;
  setEditIndex: (index: number | null) => void;
  filterText: string;
  setFilteredContact: (contact: ContactType[]) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  setForm,
  form,
  editIndex,
  setEditIndex,
  contacts,
  setContacts,
  modalOpen,
  setModalOpen,
  filterText,
  setFilteredContact,
}) => {
  const [showErrors, setShowErrors] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleAddContact = () => {
    if (!form.name || !form.email || !form.phone) {
      setShowErrors({
        name: !form.name,
        email: !form.email,
        phone: !form.phone,
      });
      return;
    }

    if (editIndex !== null) {
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = form;
      console.log(updatedContacts);

      if (filterText) {
        setFilteredContact(
          updatedContacts.filter((contact) =>
            contact.name.toLowerCase().includes(filterText.toLowerCase())
          )
        );
      }

      setContacts(updatedContacts);
      setEditIndex(null);
    } else {
      const updatedContacts = [...contacts, form];
      if (filterText) {
        setFilteredContact(
          updatedContacts.filter((contact) =>
            contact.name.toLowerCase().includes(filterText.toLowerCase())
          )
        );
      }
      setContacts(updatedContacts);
    }
    setForm({ name: "", email: "", phone: "" });
    setModalOpen(false);
  };

  const closeModal = () => {
    setForm({ name: "", email: "", phone: "" });
    setShowErrors({ name: false, email: false, phone: false });
    setModalOpen(false);
  };

  return (
    <Modal
      opened={modalOpen}
      onClose={closeModal}
      title={editIndex !== null ? "Edit Contact" : "Add Contact"}
    >
      <TextInput
        label="Name"
        placeholder="Enter name"
        name="name"
        value={form.name}
        onChange={handleInputChange}
        className="mb-2"
        error={showErrors.name && "Name is required"}
      />
      <TextInput
        label="Email"
        placeholder="Enter email"
        name="email"
        value={form.email}
        onChange={handleInputChange}
        className="mb-2"
        error={showErrors.email && "Email is required"}
      />
      <TextInput
        label="Phone"
        placeholder="Enter phone"
        name="phone"
        value={form.phone}
        onChange={handleInputChange}
        className="mb-2"
        error={showErrors.phone && "Phone is required"}
      />

      <div className="w-full flex justify-end my-4 items-center gap-4">
        <Button onClick={closeModal} variant="subtle">
          Cancel
        </Button>

        <Button onClick={handleAddContact} variant="filled" color="green">
          {editIndex !== null ? "Update" : "Add"} Contact
        </Button>
      </div>
    </Modal>
  );
};

export default AddressModal;
