import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

function ContactList() {

function getNumberOfPages(rowCount, rowsPerPage) {
  return Math.ceil(rowCount / rowsPerPage);
}

function toPages(pages) {
  const results = [];

  for (let i = 1; i < pages; i++) {
    results.push(i);
  }

  return results;
}

const handleDelete= async(id) =>{
  //console.log(id);
  let res = fetch("http://localhost:8000/api/deletecontacts/"+id,{
    method:"DELETE",
    headers:{'content-type':'application-json'}
  });

  window.location.reload();
}

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true
  },
  {
    name: "Number",
    selector: (row) => row.number,
    sortable: true
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    button: true,
    cell: (row) => (
      <div className="App">
        <div class="openbtn text-center">
  
            <button
            type="button"
            class="btn btn-primary"
            onClick={()=>handleDelete(row.id)}
          >
            Delete
          </button>
          
        </div>
      </div>
    )
  }
];

// RDT exposes the following internal pagination properties
const BootyPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage, // available but not used here
  currentPage
}) => {
  const handleBackButtonClick = () => {
    onChangePage(currentPage - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(currentPage + 1);
  };

  const handlePageNumber = (e) => {
    onChangePage(Number(e.target.value));
  };

  const pages = getNumberOfPages(rowCount, rowsPerPage);
  const pageItems = toPages(pages);
  const nextDisabled = currentPage === pageItems.length;
  const previosDisabled = currentPage === 1;

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleBackButtonClick}
            disabled={previosDisabled}
            aria-disabled={previosDisabled}
            aria-label="previous page"
          >
            Previous
          </button>
        </li>
        {pageItems.map((page) => {
          const className =
            page === currentPage ? "page-item active" : "page-item";

          return (
            <li key={page} className={className}>
              <button
                className="page-link"
                onClick={handlePageNumber}
                value={page}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleNextButtonClick}
            disabled={nextDisabled}
            aria-disabled={nextDisabled}
            aria-label="next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};


  const [userData, setUserdata] = useState([])

  useEffect(() => {
    const getUserdata = async()=>{
      const reqData = await fetch("http://localhost:8000/api/allcontacts")
      const resData = await reqData.json();
      setUserdata(resData);
      console.log(resData);
    }
    getUserdata()
  }, [])

  return (
    <div className="container my-lg-4">
      <div className="card">
        <DataTable
          title="All Contacts"
          columns={columns}
          data={userData}
          defaultSortFieldID={1}
          pagination
          paginationComponent={BootyPagination}
        />
      </div>
    </div>
  );
}

export default ContactList
