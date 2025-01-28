import { useState, useEffect } from "react";
import { Button, TextInput } from "@mantine/core";
import { ContactType } from "./types";
import AddressModal from "./components/AddressModal";
import AddressList from "./components/AddressList";

const AddressBook = () => {
  const [contacts, setContacts] = useState<ContactType[]>(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [filteredContact, setFilteredContact] = useState<ContactType[]>([]);
  const [filterText, setFilterText] = useState("");
  const [form, setForm] = useState<ContactType>({
    name: "",
    email: "",
    phone: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleEditContact = (index: number) => {
    setForm(filterText ? filteredContact[index] : contacts[index]);
    setEditIndex(filterText ? contacts.indexOf(filteredContact[index]) : index);
    setModalOpen(true);
  };

  const handleDeleteContact = (index: number) => {
    if (filterText) {
      const contact = filteredContact[index];

      setContacts(contacts.filter((c) => c !== contact));
      setFilteredContact(filteredContact.filter((_, i) => i !== index));
    } else {
      setContacts(contacts.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl lg:text-4xl font-bold mb-4">Address Book</h1>
        <Button
          onClick={() => setModalOpen(true)}
          variant="filled"
          color="blue"
          className="mb-4"
        >
          Add Contact
        </Button>
      </div>

      <AddressModal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        contacts={contacts}
        setContacts={setContacts}
        form={form}
        setForm={setForm}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        setFilteredContact={setFilteredContact}
        filterText={filterText}
      />

      <TextInput
        placeholder="Search contacts"
        value={filterText}
        onChange={(e) => {
          setPage(1);
          setFilteredContact(
            contacts.filter(
              (contact) =>
                contact.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) ||
                contact.email
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) ||
                contact.phone
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
            )
          );
          setFilterText(e.target.value);
        }}
        className="mb-4"
      />

      <AddressList
        contacts={filterText ? filteredContact : contacts}
        activePage={activePage}
        handleEditContact={handleEditContact}
        handleDeleteContact={handleDeleteContact}
        setPage={setPage}
      />
    </div>
  );
};

export default AddressBook;
