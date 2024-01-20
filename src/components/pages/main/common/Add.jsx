import { useState } from 'react';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

const AddArtical = ({ handleAdd,toggleAdd}) => {
  const [cancelAdd, setCancelAdd] = useState(toggleAdd);
  const [articalTitle, setArticalTitle] = useState('');
  const [articalBody, setArticalBody] = useState('');

  const handleCancelAddArtical = () => {
    setCancelAdd(!toggleAdd);
  };

  const handleAddArticalClick = () => {
    if (articalTitle.trim() !== '' && articalBody.trim() !== '') {
      handleAdd(articalTitle, articalBody);
      setArticalTitle('');
      setArticalBody('');
      setCancelAdd(toggleAdd);
    }
  };

  if (!cancelAdd) {
    return null;
  }

  return (
    <div className="add">
      <div className="add-details">
        <input
          type="text"
          value={articalTitle}
          onChange={(e) => setArticalTitle(e.target.value)}
        />
        <textarea
          rows="8"
          value={articalBody}
          onChange={(e) => setArticalBody(e.target.value)}
        />
      </div>
      <div className="add-actions">
        <MdCancel className="cancel" onClick={handleCancelAddArtical} />
        <BsCheck2Circle className="check" onClick={handleAddArticalClick} />
      </div>
    </div>
  );
};

export default AddArtical;
