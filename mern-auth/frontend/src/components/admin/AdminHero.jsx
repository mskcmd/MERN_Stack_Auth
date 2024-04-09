import { Button } from "react-bootstrap";
import "./AdminHero.css";
import { useEffect } from "react";
import {
  useGetUsersMutation,
  useDeleteUserMutation,
} from "../../slices/adminApiSlice";
import {
  setSearchResult,
  setUpdatedUser,
  setPage,
  setSearchKey,
} from "../../slices/searchSlice";
import { BASE_URL } from "../../utilities/baseUrl";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
const AdminHero = () => {
  const { page, lastPage, result, searchKey } = useSelector(
    (state) => state.searchUsers
  );
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const [deleteUser] = useDeleteUserMutation();
  const [getUsers, { isLoading }] = useGetUsersMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const res = await getUsers({ page: page, key: searchKey }).unwrap();
        dispatch(setSearchResult({ ...res }));
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
        console.log(err?.data?.message || err?.error);
      }
    };
    getUsersData();
  }, [page, searchKey, isLoading]);

  const handleDelete = async (id) => {
    const responce = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (responce.isConfirmed) {
      try {
        await deleteUser({ id });
        const newUsers = result.filter((item) => item._id != id);
        dispatch(setUpdatedUser([...newUsers]));
        console.log(newUsers, id);
        toast.success("User deleted successfully");
      } catch (error) {
        console.error(error);
        console.error(error);
        toast.error("Failed to delete user");
      }
    }
  };
  return (
    <>
      {adminInfo && <Header />}
      <link rel="stylesheet" href="styles.css" />
      <section className="admin-panel">
        <header>
          <h2>Customers</h2>
          <Link to="/admin/dashboard/adduser">
            <Button variant="success">Add User</Button>
          </Link>
        </header>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchKey}
            onChange={(e) => dispatch(setSearchKey(e.target.value))}
            id="searchInput"
          />
        </div>
        <div className="user-list">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody id="userList">
              {result.map((item) => (
                <tr key={item._id}>
                  <td>
                    {" "}
                    <div className="image-container mr-2 sm:mr-3">
                      <img
                        className="rounded-image"
                        src={`${BASE_URL}static/userImages/${item.image}`}
                        width="40"
                        height="40"
                        alt="Alex Shatov"
                      />
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center">
                      <Button
                        onClick={() =>
                          navigate("/admin/dashboard/edit-user", {
                            state: { item: item },
                          })
                        }
                      >
                        Edit
                      </Button>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center">
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <Button
            disabled={page == 1}
            onClick={() => dispatch(setPage(Number(page) - 1))}
          >
            Previous
          </Button>
          <Button>{page}</Button>
          <button
            className="pagination"
            disabled={page == lastPage}
            onClick={() => dispatch(setPage(1 + Number(page)))}
          >
            Next
          </button>
        </div>
      </section>
      <script src="script.js"></script>
    </>
  );
};

export default AdminHero;
