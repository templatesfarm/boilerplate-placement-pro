import { Button } from "./ui/button";

export const ApplyChangesButton = ({
  handleClick,
  isEditing,
}: {
  handleClick: () => void;
  isEditing: boolean;
}) => {
  return (
    <>
      {isEditing && (
        <div className="flex justify-end my-5 z-50">
          <Button onClick={handleClick} className="cursor-pointer z-50">
            Apply Changes
          </Button>
        </div>
      )}
    </>
  );
};
