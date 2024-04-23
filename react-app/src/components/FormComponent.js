import { useState,useEffect } from "react";
import "./FormComponent.css";
import { v4 as uuidv4 } from "uuid";
import "./Transaction.js"


const FormComponent = (props) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState([]);
  const [formValid,setFormVlid] = useState(false)
  // ให้ค่า inputTitle เก็บไว้ใน setTitle
  const inputTitle = (event) => {
    setTitle(event.target.value);
  };
  // ให้ค่า inputAmount เก็บไว้ใน setAmount
  const inputAmount = (event) => {
    setAmount(event.target.value);
  };
  // event.preventDefault(); จะไม่ให้ form รีเชต 
  // saveItem จะเก็บทุกค่าที่ได้จากกรอกข้อมูลเก็บไว้ใน itemData 
  const saveItem = (event) => {
    event.preventDefault();
    const itemData = {
      id: uuidv4(),
      amount: Number(amount),
      title: title
    };
    // รับค่า onAddItem จากหน้า app 
    props.onAddItem(itemData);
    setTitle('')
    setAmount(0)
  };

  useEffect(()=>{
    const checkData = title.trim().length>0 && amount!==0
    setFormVlid(checkData)
  },[amount,title])
  return (
    <div className="container">
       <form onSubmit={saveItem}>
                <div className="form-control">
                    <label>ชื่อรายการ</label>
                    <input type="text" placeholder="ระบุชื่อรายการของคุณ" onChange={inputTitle} value={title}/>
                </div>
                <div className="form-control">
                    <label>จำนวนเงิน</label>
                    <input type="number" placeholder="(+ รายรับ , - รายจ่าย)" onChange={inputAmount} value={amount}/>
                </div>
                <div>
                    <button type="submit" className="btn" disabled={!formValid}>เพิ่มข้อมูล</button>
                </div>
            </form>
    </div>
  );
};

export default FormComponent;
