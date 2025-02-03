// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { recruitersData as companies } from './recruitersData';

// const CompanyDetail = () => {
//   const { id } = useParams();
  
//   console.log("Params ID:", id);
//   console.log("Companies Data:", companies);

//   const company = companies.find(c => c.id.toString() === id);
  
//   console.log("Matched Company:", company);

//   if (!company) {
//     return <div className="text-center p-6">Company not found.</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold">{company.name}</h1>
//       <p className="text-lg mt-2">{company.description}</p>
//       <p className="mt-2"><strong>Headquarters:</strong> {company.headquarters}</p>
//       <p className="mt-2"><strong>Founded:</strong> {company.founded}</p>
//       <p className="mt-2"><strong>Industry:</strong> {company.industry}</p>
//       <p className="mt-2"><strong>Services:</strong> {company.services ? company.services.join(", ") : "N/A"}</p>
//       <p className="mt-2">
//         <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//           Visit Website
//         </a>
//       </p>
//     </div>
//   );
// };

// export default CompanyDetail;

