import "./index.css";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import OutputTable, { inputData } from "./html2";
import axios from "axios";  
const initialFormData: inputData = {
  fname: "",
  mail: "",
  number: "",
  website: "",
  contactName: "",
  contactPhone: "",
  contactMail: "",
  notes: "",
  type: "",
  category: "",
  percentage: 0,
  activeFrom: "",
  criticalAccount: "",
  paymentOptions: "",
};
const Multiple: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<inputData[]>([]);
  const [formData, setformData] = useState<inputData>(initialFormData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterPaymentOption, setFilterPaymentOption] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<inputData[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3005") 
      .then((response) => {
        setSubmittedData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingIndex === null) {
      try {
        const response = await fetch('http://localhost:3005/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        // Handle response data if necessary
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
      setSubmittedData([...submittedData, formData]);
    } else {
      try {
        const response = await fetch(
          `http://localhost:3005//${editingIndex}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        // Handle response data if necessary
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
      const updatedDataList = [...submittedData];
      updatedDataList[editingIndex] = formData;
      setSubmittedData(updatedDataList);
      setEditingIndex(null);
    }
    setformData(initialFormData);
  };
  const handleEdit = (data: inputData, index: number) => {
    setformData(data);
    setEditingIndex(index);
  };
  const handleDelete = (index: number) => {
    const updatedData = [...submittedData];
    updatedData.splice(index, 1);
    setSubmittedData(updatedData);
  };
  const handlePaymentOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterPaymentOption(event.target.value);
  };
  const applyFilter = () =>{  
  const filteredData =
    filterType === null
      ? submittedData
      : submittedData.filter((data) => data.type === filterType);

      setFilteredData(filteredData)
      const filteredDataByPaymentOption =
      filterPaymentOption === null
        ? filteredData
        : filteredData.filter((data) => data.paymentOptions === filterPaymentOption);

    setFilteredData(filteredDataByPaymentOption);
  };
  const clearFilter = () => {
    setFilterType(null); 
    setFilteredData([]); 
  };
  return (
    <>
    <div>
      <h2>Merchant Form</h2>
      <form onSubmit={handleSubmit}>
        <table className="table1">
          <tr>
            <td>
              <label htmlFor="fname">
                <b>Name:</b>
              </label>
            </td>
            <td>
              <input
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="mobile">
                <b>Email:</b>
              </label>
            </td>
            <td>
              <input
                type="email"
                id="mail"
                name="mail"
                value={formData.mail}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="tel">
                <b>Mobile Number:</b>
              </label>
            </td>
            <td>
              <input
                type="tel"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="website">
                <b>Website:</b>
              </label>
            </td>
            <td>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="contact">
                <b>Contact name:</b>
              </label>
            </td>
            <td>
              <input
                type="text"
                id="contact-Name"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="number">
                {" "}
                <b>Contact Number:</b>
              </label>
            </td>
            <td>
              <input
                type="tel"
                id="contact-number"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="e-mail">
                <b>Contact email:</b>
              </label>
            </td>
            <td>
              <input
                type="email"
                id="Contact-email"
                name="contactMail"
                value={formData.contactMail}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="notes">
                <b>Notes:</b>
              </label>
            </td>
            <td>
              <input
                type="text"
                id="notes"
                name="notes"
                placeholder="Comment your thoughts..!"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="text" className="type">
                <b>Type:</b>
              </label>
            </td>
            <td>
              <input
                type="radio"
                id="type-variety"
                name="type"
                value="Small Business"
                checked={formData.type === "Small Business"}
                onChange={handleInputChange}
              />
              <label htmlFor="text">Small Business</label>
              <input
                type="radio"
                id="type-variety"
                name="type"
                value="Enterprise"
                checked={formData.type === "Enterprise"}
                onChange={handleInputChange}
              />
              <label htmlFor="text">Enterprise</label>
              <input
                type="radio"
                id="type-variety"
                name="type"
                value="Entrepreneur"
                checked={formData.type === "Entrepreneur"}
                onChange={handleInputChange}
              />
              <label htmlFor="text">Entrepreneur</label>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="text">
                <b>Category:</b>
              </label>
              <br />
            </td>
            <td>
              <select
                id="category-variety"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="Clothes">Clothes</option>
                <option value="Toys">Toys</option>
                <option value="Groceries">Groceries</option>
                <option value="Electronics">Electronics</option>
                <option value="Digital">Digital</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="percentage">
                <b>Commission percentage:</b>
              </label>
            </td>
            <td>
              <input
                type="number"
                id="percentage"
                name="percentage"
                min="0"
                max="100"
                value={formData.percentage}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="ActiveFrom" className="activeFrom">
                <b>Active from:</b>
              </label>
            </td>
            <td>
              <input
                type="date"
                id="duration"
                name="activeFrom"
                value={formData.activeFrom}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="image" className="Logo">
                <b>Logo:</b>
              </label>
            </td>
            <td>
              <input
                type="file"
                id="image"
                name="Logo"
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <b>Critical Account:</b>
              </label>
            </td>
            <td>
              <input
                type="radio"
                id="yes"
                name="criticalAccount"
                value="YES"
                checked={formData.criticalAccount === "YES"}
                onChange={handleInputChange}
              />
              <label htmlFor="yes">YES</label>
              <input
                type="radio"
                id="no"
                name="criticalAccount"
                value="NO"
                checked={formData.criticalAccount === "NO"}
                onChange={handleInputChange}
              />
              <label>NO</label>
              <sup>*</sup>If YES, we can provide extra care in case of any
              queries.
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <b>Payment options:</b>
              </label>
            </td>
            <td>
              <input
                type="radio"
                id="cash"
                name="paymentOptions"
                value="Cash on Delivery"
                checked={formData.paymentOptions === "Cash on Delivery"}
                onChange={handleInputChange}
              />
              <label>Cash on delivery</label>

              <input
                type="radio"
                id="online"
                name="paymentOptions"
                value="UPI"
                checked={formData.paymentOptions === "UPI"}
                onChange={handleInputChange}
              />
              <label>UPI</label>

              <input
                type="radio"
                id="card"
                name="paymentOptions"
                value="Card payment"
                checked={formData.paymentOptions === "Card payment"}
                onChange={handleInputChange}
              />
              <label>Card payment</label>
            </td>
          </tr>
          <tr />
          <tr>
            <td>
              <button type="submit" id="Submit">
                Submit
              </button>
              <button type="reset" id="reset" className="re-set">
                Reset
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
    <div>
    <h3>Filter Options:</h3>
    <label>
      <input
        type="radio"
        name="filterType"
        value="Small Business"
        checked={filterType === "Small Business"}
        onChange={() => setFilterType("Small Business")}
      />
      Small Business
    </label>
    <label>
      <input
        type="radio"
        name="filterType"
        value="Enterprise"
        checked={filterType === "Enterprise"}
        onChange={() => setFilterType("Enterprise")}
      />
      Enterprise
    </label>
    <label>
      <input
        type="radio"
        name="filterType"
        value="Entrepreneur"
        checked={filterType === "Entrepreneur"}
        onChange={() => setFilterType("Entrepreneur")}
      />
      Entrepreneur
    </label>
    <button onClick={applyFilter}>Apply Filter</button>
    <button onClick={clearFilter}>Clear Filter</button>
    <div>
          <h3>Filter by Payment Option:</h3>
          <label>
            <input
              type="radio"
              name="filterPaymentOption"
              value="Cash on Delivery"
              checked={filterPaymentOption === "Cash on Delivery"}
              onChange={handlePaymentOptionChange}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="filterPaymentOption"
              value="UPI"
              checked={filterPaymentOption === "UPI"}
              onChange={handlePaymentOptionChange}
            />
            UPI
          </label>
          <label>
            <input
              type="radio"
              name="filterPaymentOption"
              value="Card payment"
              checked={filterPaymentOption === "Card payment"}
              onChange={handlePaymentOptionChange}
            />
            Card payment
          </label>
          <button onClick={applyFilter}>Apply Filter</button>
          <button onClick={clearFilter}>Clear Filter</button>
        </div>
   
  </div>
  <OutputTable
    submittedData={filteredData.length ? filteredData : submittedData}
    setSubmittedData={setSubmittedData}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
  </>
);
  }
export default Multiple;