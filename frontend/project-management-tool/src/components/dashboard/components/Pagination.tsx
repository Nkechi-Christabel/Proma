import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

interface Props {
  project: string[];
  setCurrentItems: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

const Pagination: React.FC<Props> = ({ project, setCurrentItems }) => {
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(project?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(project?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, project, setCurrentItems]);

  // Invoke when user click to request another page.
  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % project?.length;
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="flex justify-center">
      <ReactPaginate
        className="pagination flex shadow-sm mt-3 mb-8 text-xs"
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={() => null}
      />
    </div>
  );
};

export default Pagination;
