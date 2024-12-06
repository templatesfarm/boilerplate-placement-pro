import React from "react";
import { FaPencilAlt } from "react-icons/fa";

interface PropTypes {
  children: React.ReactNode;
  isEditing: boolean;
  handleEditClick: () => void;
}

const EditComponentNew: React.FC<PropTypes> = ({
  children,
  isEditing,
  handleEditClick,
}) => {
  return (
    <div
      className={`relative ${isEditing ? "border border-red-500 my-2" : ""}`}
    >
      {isEditing && (
        <div className="absolute top-2 right-2">
          <button onClick={handleEditClick}>
            <FaPencilAlt className="w-5 h-5" />
          </button>
        </div>
      )}
      <div className={`${isEditing ? "mt-8 mb-2" : ""}`}>{children}</div>
    </div>
  );
};

export default EditComponentNew;
