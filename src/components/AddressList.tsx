import React from "react";
import { ContactType } from "../types";
import { Button, Pagination } from "@mantine/core";

interface AddressListProps {
  contacts: ContactType[];
  activePage: number;
  handleEditContact: (index: number) => void;
  handleDeleteContact: (index: number) => void;
  setPage: (value: number) => void;
}

const AddressList: React.FC<AddressListProps> = ({
  contacts,
  activePage,
  handleEditContact,
  handleDeleteContact,
  setPage,
}) => {


  return (
    <>
      {contacts.length === 0 ? (
        <p className="text-center my-4">No contacts found.</p> // Display a message when there are no contacts</div>
      ) : (
        <ul className="divide-y divide-gray-300 mb-8">
          {contacts
            .slice((activePage - 1) * 10, activePage * 10)
            .map((contact, index) => (
              <li key={index} className="flex justify-between items-start p-2">
                <div className="flex gap-4 justify-start ">
                  <div>{index + (activePage - 1) * 10 + 1} . </div>

                  <div>
                    <p className="font-semibold text-lg">{contact.name}</p>
                    <p className="text-gray-400 text-xs">{contact.email}</p>
                    <p className="text-xs">{contact.phone}</p>
                  </div>
                </div>

                <div>
                  <Button
                    onClick={() => handleEditContact(index)}
                    variant="light"
                    color="yellow"
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteContact(index)}
                    variant="light"
                    color="red"
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      )}

      <Pagination
        total={Math.ceil(contacts.length / 10)}
        value={activePage}
        onChange={(value: number) => setPage(value)}
        className="flex justify-center items-center"
      />
    </>
  );
};

export default AddressList;
