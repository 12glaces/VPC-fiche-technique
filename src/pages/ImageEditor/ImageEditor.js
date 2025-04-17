import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./ImageEditor.styles.scss";
import bgImage from "../../assets/VPC-PLAQUE.png";
import logo from "../../assets/RdvSt-Hilaire-de-Chaleons.png";
import { motion } from "framer-motion";
const fields = [
  "MARQUE",
  "TYPE",
  "ANNÉE",
  "CYLINDRÉE",
  "PUISSANCE",
  "VITESSE MAX",
  "ORIGINE",
  "DIVERS",
  "NBRE DE CYLINDRES",
  "TRANSMISSION",
];
const positions = {
  MARQUE: {
    top: "170px",
    left: "",
    transform: "translateX(-50%)",
    fontsize: "20px",
  },
  TYPE: {
    top: "195px",
    left: "",
    transform: "translateX(-50%)",
    fontsize: "20px",
  },
  ANNÉE: {
    top: "218px",
    left: "",
    transform: "translateX(-50%)",
    fontsize: "20px",
  },
  CYLINDRÉE: { top: "242px", left: "235px" },
  PUISSANCE: { top: "262px", left: "235px" },
  "VITESSE MAX": { top: "282px", left: "235px" },
  ORIGINE: { top: "302px", left: "235px" },
  DIVERS: { top: "322px", left: "235px" },
  "NBRE DE CYLINDRES": { top: "240px", left: "470px" },
  TRANSMISSION: { top: "261px", left: "470px" },
};
const ImageEditor = () => {
  const [showError, setShowError] = useState(false);
  const [data, setData] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setData({ ...data, [name]: capitalizedValue });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isComplete = fields.every(
    (field) => data[field] && data[field].trim() !== ""
  );

  const handleDownloadPDF = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const element = document.querySelector(".preview-image");

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const imgProps = pdf.getImageProperties(imgData);
    const imgRatio = imgProps.width / imgProps.height;

    let pdfWidth = pageWidth - 7;
    let pdfHeight = pdfWidth / imgRatio;

    if (pdfHeight > pageHeight - 20) {
      pdfHeight = pageHeight - 20;
      pdfWidth = pdfHeight * imgRatio;
    }

    const x = (pageWidth - pdfWidth) / 2;
    const y = (pageHeight - pdfHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, pdfWidth, pdfHeight);
    pdf.save("fiche-technique.pdf");
  };

  const handleClick = () => {
    if (!isComplete) {
      setShowError(true);
    } else {
      setShowError(false);
      handleDownloadPDF();
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="logo">
        <img src={logo} alt="VPC-logo" />
      </div>
      <div className="editor-page">
        <div className="form-section">
          <h2>Formulaire Fiche Technique </h2>
          {fields.map((field) => (
            <div key={field} className="form-group">
              <input
                type="text"
                name={field}
                value={data[field] || ""}
                onChange={handleChange}
                placeholder=" "
                id={field}
                maxLength={
                  field === "TRANSMISSION"
                    ? 1
                    : field === "NBRE DE CYLINDRES"
                    ? 2
                    : undefined
                }
              />
              <label htmlFor={field}>{field}</label>
            </div>
          ))}
          <div className="image-upload">
            <label className="upload-label">
              Ajouter un logo (optionnel)
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {uploadedImage && (
                <div className="image-preview">
                  <img src={uploadedImage} alt="upload-preview" />
                </div>
              )}
            </label>
          </div>

          <div className="preview-section">
            <div
              className="preview-image"
              onContextMenu={(e) => e.preventDefault()}
            >
              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="fiche"
                  className="uploaded-icon"
                  onClick={handleClick}
                  style={{ cursor: isComplete ? "pointer" : "not-allowed" }}
                />
              )}
              <img
                src={bgImage}
                alt="fiche"
                className="bg"
                onClick={handleClick}
                style={{ cursor: isComplete ? "pointer" : "not-allowed" }}
              />
              <div className="overlay">
                {fields.map((field) => (
                  <p
                    key={field}
                    className="field"
                    style={{
                      top: positions[field]?.top || "0%",
                      left: positions[field]?.left || "50%",
                      transform: positions[field]?.transform || "0%",
                      fontSize: positions[field]?.fontsize || "16px",
                    }}
                  >
                    {data[field] || ""}
                  </p>
                ))}
              </div>
            </div>
            {showError && !isComplete && (
              <p className="error-message">
                Veuillez remplir tous les champs avant de télécharger.
              </p>
            )}
            <button
              className={`download-btn ${isComplete ? "active" : ""}`}
              onClick={handleClick}
            >
              Télécharger
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageEditor;
