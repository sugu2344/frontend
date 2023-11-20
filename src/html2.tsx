import React from "react";
export interface inputData {
  fname: string;
  mail: string;
  number: string;
  website: string;
  contactName: string;
  contactPhone: string;
  contactMail: string;
  notes: string;
  type: string;
  category: string;
  percentage: number;
  activeFrom: string;
  // Logo:image;
  criticalAccount: string;
  paymentOptions: string;
}
interface PropsType {
  submittedData: inputData[];
  setSubmittedData: React.Dispatch<React.SetStateAction<inputData[]>>;
  onEdit: (data: inputData, index: number) => void;
  onDelete: (index: number) => void;
}

const OutputTable: React.FC<PropsType> = ({
  submittedData,
  // setSubmittedData,
  onEdit,
  onDelete,
}) => {
  return (
    <table id="dataTable" className="table-scroll">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Contact Name</th>
          <th>Contact Phone</th>
          <th>Contact Email</th>
          <th>Notes</th>
          <th>Type</th>
          <th>Category</th>
          <th>Commission Percentage</th>
          <th>Active From</th>
          {/* <th>Logo</th> */}
          <th>Critical Account</th>
          <th>Payment Options</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {submittedData.map((data, index) => (
          <tr key={index}>
            <td>{data.fname}</td>
            <td>{data.mail}</td>
            <td>{data.number}</td>
            <td>{data.website}</td>
            <td>{data.contactName}</td>
            <td>{data.contactPhone}</td>
            <td>{data.contactMail}</td>
            <td>{data.notes}</td>
            <td>{data.type}</td>
            <td>{data.category}</td>
            <td>{data.percentage}</td>
            <td>{data.activeFrom}</td>
            {/* <td>{data.logo}</td> */}
            <td>{data.criticalAccount}</td>
            <td>{data.paymentOptions}</td>
            <td>
              <button onClick={() => onEdit(data, index)}>Edit</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OutputTable;