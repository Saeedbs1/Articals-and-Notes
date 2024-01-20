import Artical from "./Artical";
import "./Artical.scss";
const ArticalsList = ({
  articals,
  handleCancelEdit,
  handleDeleteArtical,
  handleEditArtical,
  searchText,
}) => {
  const highlightText = (text) => {
    if (!searchText) return text;

    const regex = new RegExp(`(${searchText})`, "gi");
    return text
      .split(regex)
      .map((part, index) =>
        regex.test(part) ? <mark key={index}>{part}</mark> : part
      );
  };

  return (
    <div className="articals-list">
      {articals.map((artical) => (
        <Artical
          key={artical.id}
          id={artical.id}
          title={highlightText(artical.title)}
          body={highlightText(artical.body)}
          date={artical.date}
          category={artical.category}
          handleCancelEdit={handleCancelEdit}
          handleDeleteArtical={handleDeleteArtical}
          handleEditArtical={handleEditArtical}
        />
      ))}
    </div>
  );
};

export default ArticalsList;
