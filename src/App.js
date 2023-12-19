import { useEffect, useRef } from "react";
// import { FaPlus } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./App.css";

function App() {
  const padref = useRef()

  useEffect(()=>{
    for (let i = 0; i < 10; i++) {
      AddRow(i)
    }
    const inputs = document.querySelectorAll(".otp-field input");

    inputs.forEach((input, index) => {
        input.dataset.index = index;
        input.addEventListener("keyup", handleOtp);
        input.addEventListener("paste", handleOnPasteOtp);
    });
    
    function handleOtp(e) {
        const input = e.target;
        let value = input.value;
        let isValidInput = value.match(/[0-9a-z]/gi);
        input.value = "";
        input.value = isValidInput ? value[0].toUpperCase() : "";
    
        let fieldIndex = input.dataset.index;
        if (fieldIndex < inputs.length - 1 && isValidInput) {
          input.nextElementSibling.focus();
        }
    
        if (e.key === "Backspace" && fieldIndex > 0) {
            input.previousElementSibling.focus();
        }
    }
    
    function handleOnPasteOtp(e) {
        const data = e.clipboardData.getData("text");
        const value = data.split("");
        if (value.length === inputs.length) {
            inputs.forEach((input, index) => (input.value = value[index]));
        }
    }
  },[])

  function AddRow(index){
    const table = document.getElementById("table")
    const Createtr = document.createElement("tr")
    for (let i = 0; i < 4; i++) {
      const Createtd = CreatetdComponent()
      if (i === 0) {
        Createtd.appendChild(CreateInputComponent("w-[200px] "))
      }else{
        if (i === 3) {
          Createtd.appendChild(CreateInputComponent("w-[120px] "))
        }else{
          
        }
      }
      Createtr.appendChild(Createtd)
    }
    table.appendChild(Createtr)
  }

  function CreatetdComponent(){
    const Createtd = document.createElement("td")
    Createtd.className += "border-2 "
    Createtd.className += "border-black"
    return Createtd
  }

  function CreateInputComponent(width) {
    const CreateInput = document.createElement("input");
    CreateInput.className += width;
    CreateInput.className += "outline-none ";
    CreateInput.className += "text-center ";
    CreateInput.className += "font-medium ";
    CreateInput.className += "h-8 "
    CreateInput.className += "items-center "
    CreateInput.className += "text-sm";
    CreateInput.maxLength = 20;
    CreateInput.inputMode = "numeric";
    return CreateInput;
  }

  const dowloadPDF = () => {
    const input = padref.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      pdf.addImage(imgData,"PNG",imgX,imgY,imgWidth * ratio,imgHeight * ratio
      );
      pdf.save("Challan.pdf");
    });
  };
  return (
    <>
      <div className="w-full h-full" ref={padref}>
        <div className="Containar w-[600px] h-full justify-center border-2 p-2 border-black">
          {/* First Row */}
          <div className="flex">
            <div className="border-2 border-black m-[1px] p-1 w-full h-full grid gap-2">
              <label className="font-medium text-sm h-5">Form</label>
              <label className="flex justify-center font-bold text-3xl">TILAK  FABRICS</label>
              <div className="flex gap-1 font-semibold text-lg pl-2">
                <label>GST</label>
                <label>:</label>
                <label>24ALEPD1281D1ZS</label>
              </div>
            </div>
            <div className="border-2 border-black m-[1px] p-1 w-full h-full grid gap-5 py-[15.5px]">
              <div className="flex gap-2">
                <label className="w-11">No.</label>
                <input type="text" className="w-full h-7 items-center font-medium border-b-2 border-black outline-none" inputMode="numeric" />
              </div>
              <div className="flex gap-2">
                <label className="w-11">Date.</label>
                <input type="date" className="w-full h-7 items-center font-medium border-b-2 border-black outline-none bg-transparent" />
              </div>
            </div>
          </div>
          {/* Seconde Row */}
          <div className="flex">
            <div className="border-2 border-black m-[1px] p-1 w-full h-full grid gap-1">
              <div className="gap-1">
                <label className="font-medium text-sm">To.</label>
                <div className="border-b-2 border-black">
                  <input className="w-[200px] h-8 items-center outline-none text-left font-medium text-sm" />
                </div>
              </div>
              <div className="grid gap-1">
                <label className="font-medium text-sm">GST No.</label>
                <div className="otp-field flex gap-[2px]">
                  <input type="text" className="w-[21px] h-7 items-center text-center font-semibold border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-semibold border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-semibold border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-semibold border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-semibold border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-semibold border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-semibold border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-semibold border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-semibold border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-semibold border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-semibold border-b-[1px] border-black focus:outline-none" maxlength="1" />
                  <input type="text" className="w-[21px] h-7 items-center text-center font-semibold border-b-[1px] border-black focus:outline-none" maxlength="1" />
                </div>
              </div>
            </div>
            <div className="border-2 border-black m-[1px] p-1 w-full h-full grid gap-8 py-[17px]">
            <div className="flex gap-5">
              <label className="w-11">P.O.No.</label>
              <input type="text" className="w-full h-7 items-center font-medium border-b-2 border-black outline-none" inputMode="numeric" />
            </div>
            <div className="flex gap-2">
              <label className="w-11">Date.</label>
              <input type="date" className="w-full h-7 items-center font-medium border-b-2 border-black outline-none bg-transparent" />
            </div>
            </div>
          </div>
          <label className="font-medium text-sm flex justify-center py-2">Please receive the undermentioned goods in good order and condition</label>
          <table id="table" className="border-2">
            <tr>
              <th className="border-2 border-black"><input className="w-[200px] h-8 text-center font-semibold text-base items-center" value="DISCRIPTION" readonly="readonly" /></th>
              <th className="border-2 border-black"><input className="w-[120px] h-8 text-center font-semibold text-base items-center" value="QUANTITY" readonly="readonly" /></th>
              <th className="border-2 border-black"><input className="w-[120px] h-8 text-center font-semibold text-base items-center" value="RATE" readonly="readonly" /></th>
              <th className="border-2 border-black"><input className="w-[120px] h-8 text-center font-semibold text-base items-center" value="AMOUNT" readonly="readonly" /></th>
            </tr>
          </table>
          <tr>
            <td className="border-2 border-t-0 border-r-0 border-black"><input className="w-[200px] outline-none  h-8 items-center text-center font-medium text-sm" maxLength={20} readonly="readonly" /></td>
            <td className="border-2 border-t-0 border-r-0 border-black"><input className="w-[120px] outline-none  h-8 items-center text-center font-medium text-sm" maxLength={12} readonly="readonly" /></td>
            <td className="border-2 border-t-0 border-r-0 border-black"><input className="w-[120px] outline-none  h-8 items-center text-center font-medium text-sm" maxLength={12} readonly="readonly" /></td>
            <td className="border-2 border-t-0 border-black"><input className="w-[120px] outline-none text-center h-8 items-center  font-medium text-sm" maxLength={12} readonly="readonly" /></td>
          </tr>
        </div>
      </div>
      <div className="w-[600px] my-2 flex justify-between">
        <div className="ml-3" onClick={dowloadPDF}>
          <button className="border-2 bg-black text-white border-black h-12 w-44 rounded-md cursor-pointer">Pdf Dowload</button>
        </div>
        {/* <div className="border-2 border-black h-12 w-44 p-1 mr-1 cursor-pointer rounded-md" onClick={AddRow}>
          <FaPlus className="text-lg text-center h-7 w-44 items-center mt-1" />
        </div> */}
      </div>
    </>
  );
}

export default App;
