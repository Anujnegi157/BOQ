import { useState, ChangeEvent } from "react";

// Define the Inputs interface
interface Inputs {
  color: string;
  category: string;
  quantity: string;
}

// Define the dataset interface for the database
interface DatasetItem {
  itemCode: string;
  itemDescription: string;
  mrp: number;
}

// Example dataset (Replace this with your actual database query)
const dataset: DatasetItem[] = [
  { itemCode: "WHT", itemDescription: "SKT", mrp: 12 },
  { itemCode: "GLD", itemDescription: "SCO", mrp: 12 },
  { itemCode: "BSL", itemDescription: "SWG", mrp: 112 },
  { itemCode: "GRY", itemDescription: "SLG", mrp: 1 },
  { itemCode: "WHT", itemDescription: "SKT", mrp: 2 },
  { itemCode: "GLD", itemDescription: "SCO", mrp: 1 },
  { itemCode: "BSL", itemDescription: "SWG", mrp: 2 },
  { itemCode: "GRY", itemDescription: "SLG", mrp: 1 },
  { itemCode: "WHT", itemDescription: "SKT", mrp: 2 },
  { itemCode: "GLD", itemDescription: "SCO", mrp: 1 },
  { itemCode: "BSL", itemDescription: "SWG", mrp: 21 },
  { itemCode: "GRY", itemDescription: "SLG", mrp: 2 },
  { itemCode: "WHT", itemDescription: "SKT", mrp: 1 },
  { itemCode: "GLD", itemDescription: "SCO", mrp: 2 },
  { itemCode: "BSL", itemDescription: "SWG", mrp: 1 },
  { itemCode: "GRY", itemDescription: "SLG", mrp: 2 },
];

const InputForm: React.FC = () => {
  const [inputs, setInputs] = useState<Inputs>({
    color: "",
    category: "",
    quantity: "",
  });

  const [totalAmount, setTotalAmount] = useState<number | null>(null); // For storing the calculated amount
  const [gagDistribution, setGagDistribution] = useState<string>("");

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission and calculate total amount
  const handleSubmit = () => {
    const { color, category, quantity } = inputs;
    const quantityNum = quantity ? parseInt(quantity, 10) : 0;

    // Search for matching items in the dataset
    const matchedItem = dataset.find(
      (item) => item.itemCode === color && item.itemDescription === category
    );

    // If a match is found, calculate the total amount
    if (matchedItem) {
      const total = matchedItem.mrp * quantityNum;
      setTotalAmount(total);

      // Logic for gag distribution
      const gags = 4;
      const quotient = Math.floor(quantityNum / gags);
      const remainder = quantityNum % gags;

      let distribution = `${gags} gang - ${quotient} times`;

      if (remainder > 0) {
        distribution += `, ${remainder} gang - 1 time`;
      }

      setGagDistribution(distribution);
      console.log("Total Amount:", total);
      console.log("Gag Distribution:", distribution);
    } else {
      setTotalAmount(null);
      setGagDistribution("No matching items found.");
      console.log("No matching items found.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "32px",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "20px",
            color: "#4a90e2",
          }}
        >
          BOQ Calculator
        </h2>

        {/* Color Input */}
        <label
          htmlFor="color"
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Color (Item Code)
        </label>
        <input
          id="color"
          name="color"
          value={inputs.color}
          onChange={handleChange}
          placeholder="e.g. WHT"
          style={{
            padding: "12px",
            marginBottom: "16px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
            boxSizing: "border-box",
            outline: "none",
            transition: "border 0.3s ease-in-out",
          }}
        />

        {/* Category Input */}
        <label
          htmlFor="category"
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Category (Item Description)
        </label>
        <input
          id="category"
          name="category"
          value={inputs.category}
          onChange={handleChange}
          placeholder="e.g. SKT"
          style={{
            padding: "12px",
            marginBottom: "16px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
            boxSizing: "border-box",
            outline: "none",
            transition: "border 0.3s ease-in-out",
          }}
        />

        {/* Quantity Input */}
        <label
          htmlFor="quantity"
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Quantity
        </label>
        <input
          id="quantity"
          name="quantity"
          value={inputs.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          style={{
            padding: "12px",
            marginBottom: "16px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
            boxSizing: "border-box",
            outline: "none",
            transition: "border 0.3s ease-in-out",
          }}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#4a90e2",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Submit
        </button>

        {/* Display Total Amount */}
        {totalAmount !== null && (
          <div
            style={{
              marginTop: "24px",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            <p
              style={{
                marginBottom: "8px",
                fontSize: "20px",
                color: "#4a90e2",
              }}
            >
              Total Amount: ₹{totalAmount}
            </p>
            <p>{gagDistribution}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputForm;
