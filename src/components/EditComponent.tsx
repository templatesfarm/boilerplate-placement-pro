import { useAppStore } from "@/store/appStore";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

interface PropTypes {
  comp: React.ReactElement;
  dialog: React.ReactElement;
}

const EditComponent: React.FC<PropTypes> = ({ comp, dialog }) => {
  const { isEditing } = useAppStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  const onOpenChange = (flag: boolean = false) => {
    setIsDialogOpen(flag);
    // Save the input value to the store or perform any other save action
  };

  return (
    <div className={`relative ${isEditing ? "border border-red-500" : ""}`}>
      {isEditing && (
        <div className="absolute top-2 right-2">
          <button onClick={handleEditClick}>
            <FaPencilAlt className="w-5 h-5" />
          </button>
        </div>
      )}
      <div className={`${isEditing ? "mt-8 mb-2" : ""}`}>
        {React.cloneElement(comp as React.ReactElement)}
        {React.cloneElement(dialog as React.ReactElement, {
          isOpen: isDialogOpen,
          onOpenChange: onOpenChange,
        })}
      </div>
    </div>
  );
};

export default EditComponent;
