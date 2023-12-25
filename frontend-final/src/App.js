import React, { useState, useEffect } from "react";
import { Heading, Select, Checkbox } from "@chakra-ui/react";
import PieChart from "./components/pie/PieChart";
import "./App.css";
import BarChart from "./components/bar/BarChart";
import axios from "axios";

const App = () => {
  const [selectedCategoryOption, setSelectedCategoryOption] = useState("");
  const [selectedVisualizationOption, setSelectedVisualizationOption] = useState("");
  const [selectedRepresentationOption, setSelectedRepresentationOption] = useState("");
  const [staffData, setStaffData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({ isExecBoard: false, isNewStaffer: false });

  const preprocessData = (dataArray) => {
    return dataArray.map((dataItem) => {
      const processedData = {};
  
      if (dataItem["board_membership"]) {
        processedData["board_membership"] = dataItem["board_membership"].replace(/;/g, " & ");
      }
  
      if (dataItem["ethnicity"]) {
        processedData["ethnicity"] = dataItem["ethnicity"].replace(/;/g, " & ");
      }
  
      if (dataItem["gender"]) {
        processedData["gender"] = dataItem["gender"].replace(/;/g, " & ");
      }
  
      if (dataItem["sexual_orientation"]) {
        processedData["sexual_orientation"] = dataItem["sexual_orientation"].replace(/;/g, " & ");
      }

      if (dataItem["country"]) {
        const countries = dataItem["country"].split(/[,&;]/).map((country) => country.trim());
        processedData["country"] = countries.join(" & ").replace(/\/| and |, /g, " & ");
      }
  
      for (const key in dataItem) {
        if (!processedData[key]) {
          processedData[key] = dataItem[key] === "" ? "No Answer" : dataItem[key];
        }
      }
  
      if (dataItem["is_international"] === "No") {
        processedData["country"] = "US";
      }
  
      return processedData;
    });
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/analysis/");
        const processedData = preprocessData(response.data);
        console.log(processedData);
        setStaffData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedCategoryOption, selectedRepresentationOption, selectedVisualizationOption]);

  const getDataForOption = (option) => {
    const filteredData = staffData.filter((item) => {
      if (filterOptions.isExecBoard && item["is_executive_board_member"] !== "Yes") {
        return false;
      }
      if (filterOptions.isNewStaffer && item["is_new_staffer_this_semester"] !== "Yes") {
        return false;
      }
      return true;
    });
    const data = {};
    filteredData.forEach((item) => {
      const value = item[option];
      data[value] = data[value] ? data[value] + 1 : 1;
    });
    const totalCount = Object.values(data).reduce((acc, count) => acc + count, 0);
    const percentages = totalCount > 0
      ? Object.fromEntries(
          Object.entries(data).map(([key, count]) => [key, (count / totalCount) * 100])
        )
      : {};
    return selectedRepresentationOption === "percentage" ? percentages : data;
  };

  const getLabelForOption = () => {
    return selectedRepresentationOption === "percentage" ? "Percentage Distribution" : "Distribution";
  };

  const categoryDict = {
    class_year: "Class Year",
    attend_brown_or_risd: "School",
    board_membership: "Board Membership",
    is_executive_board_member: "Executive Board",
    is_new_staffer_this_semester: "New Staffer",
    ethnicity: "Ethnicity",
    is_fgli: "FGLI",
    gender: "Gender",
    sexual_orientation: "Sexual Orientation",
    is_international: "International",
    country: "Country",
  };

  return (
    <div className="page">
      <div className="heading">
        <Heading fontWeight="regular" padding={3}>
          Diversity @ BPR
        </Heading>
      </div>
      <div className="category">
        <div className="guiding-text-1">
          Choose a category type
        </div>
        <Select
          id="selectCategoryOption"
          value={selectedCategoryOption}
          onChange={(e) => setSelectedCategoryOption(e.target.value)}
        >
          <option value="" disabled>No Category Type Chosen</option>
          <option value="class_year">Class Year</option>
          <option value="attend_brown_or_risd">School</option>
          <option value="board_membership">Board Membership</option>
          <option value="is_executive_board_member">Executive Board</option>
          <option value="is_new_staffer_this_semester">New Staffer</option>
          <option value="ethnicity">Ethnicity</option>
          <option value="is_fgli">FGLI</option>
          <option value="gender">Gender</option>
          <option value="sexual_orientation">Sexual Orientation</option>
          <option value="is_international">International</option>
          <option value="country">Country</option>
        </Select>
      </div>
      <div className="visualization">
        <div className="guiding-text-2">
          Choose a graph type
        </div>
        <Select 
          id="selectVisualizationOption"
          value={selectedVisualizationOption}
          onChange={(e) => setSelectedVisualizationOption(e.target.value)}
        >
          <option value="" disabled>No Graph Type Chosen</option>
          <option value="pie chart">Pie Chart</option>
          <option value="bar chart">Bar Chart</option>
        </Select>
      </div>
      <div className="representation">
        <div className="guiding-text-3">
          Choose a representation type
        </div>
        <Select 
          id="selectRepresentationOption"
          value={selectedRepresentationOption}
          onChange={(e) => setSelectedRepresentationOption(e.target.value)}
        >
          <option value="" disabled>No Representation Type Chosen</option>
          <option value="percentage">Percentage</option>
          <option value="number">Number</option>
        </Select>
      </div>
      <div className="check-boxes">
        <div className="instruction">
          <b>Choose a filter</b>
        </div>
        <Checkbox
          id="isExecBoard"
          isChecked={filterOptions.isExecBoard}
          onChange={() => setFilterOptions((prev) => ({ ...prev, isExecBoard: !prev.isExecBoard }))}
        >
          Executive Board Members
        </Checkbox>
        <Checkbox
          id="isNewStaffer"
          isChecked={filterOptions.isNewStaffer}
          onChange={() => setFilterOptions((prev) => ({ ...prev, isNewStaffer: !prev.isNewStaffer }))}
          style={{ marginLeft: '10px' }}
        >
          New Staffers
        </Checkbox>
      </div>
      {selectedCategoryOption && selectedVisualizationOption && selectedRepresentationOption && (
        <div className="graph">
          {selectedVisualizationOption === "pie chart" ? (
            <PieChart data={getDataForOption(selectedCategoryOption)} title={`Distribution for ${categoryDict[selectedCategoryOption]}`} />
          ) : (
            <BarChart data={getDataForOption(selectedCategoryOption)} label={getLabelForOption()} title={`Distribution for ${categoryDict[selectedCategoryOption]}`} />
          )}
        </div>
      )}
      <div className="fact-heading">
        <b>Diversity Summary</b>
      </div>
      <div className="fact-box">
        <div className="analysis">
          <b>Observations</b>
          <br></br>
          • 55.7% of staff are freshmen or sophomores.
          <br></br>
          • 14.3% of staff are RISD students.
          <br></br>
          • 50% of E-board members identify as non-White, and 41.7% identify as female or non-binary.
          <br></br>
          • The boards with most staff are Editorial (36.2%), Business (14.5%), Copy Edit (13%), and Data (11.6%).
          <br></br>
          • 8.6% of staff are part of two boards.
          <br></br>
          • 47.2% of staff are new staffers in Fall 2023.
          <br></br>
          • 41.7% of staff identify as non-White, including 16.7% who identify as multi-racial.
          <br></br>
          • 17.1% of staff identify as FGLI (first-generation, low-income).
          <br></br>
          • 47.2% of staff identify as female, and 4.2% identify as non-binary or trans.
          <br></br>
          • 35.7% of staff identify as non-heterosexual.
          <br></br>
          • 22.2% of staff are international students.
          <br></br>
          • BPR staff represent 13 countries across 3 continents, in addition to the US.
        </div>
        <div className="notes">
          <b>Notes</b>
          <br></br>
          • The data visualization above aims to present a comprehensive 
          overview of the demographic breakdown of BPR staff. It serves 
          as a means to understand and showcase the diversity within the organization's staff.
          <br></br>
          • Here, "staff" refers to those who participated in our 2023-2024 demographic survey.
          In this case, 72 responses were collected. 
          <br></br>
          • Null answers were excluded from the percentage calculations. For instance, if there were 72 responses to a question and 69 of them 
          were valid, the percentage for each answer was calculated based on the 
          total occurrences of that answer divided by 69.
        </div>
      </div>
      <div className="footer">
        Made with ♥︎ by Yifan Zhang (2023)
      </div>
    </div>
  );
};

export default App;
