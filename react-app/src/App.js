
import { useState,useEffect,useReducer } from 'react';
import './App.css';
import FormComponent from './components/FormComponent';
import Transaction from './components/Transaction';
import DataContext from './data/DataContext';
import ReportComponent from './components/ReportComponent';
import {BrowserRouter as Router,Route,Link,Routes} from 'react-router-dom';



const design = {color:"red",textAlign:"center",fontSize:'1.5rem'}
// const initData =[
//   {id:1,title:"ค่าใช้จ่าย",amount:2000},
//   {id:2,title:"ค่าเที่ยว",amount:-3000},
//   {id:3,title:"ค่าของเล่น",amount:50000},
//   {id:4,title:"ค่าบ้าน",amount:-600000},
//   {id:5,title:"ค่าประกัน",amount:8000},
//   {id:6,title:"ค่าเดินทาง",amount:600}
// ]



function App() {

  const [items,setItems] = useState([])
  const [reprortIcome,setreprortIcome] = useState (0)
  const [reprortExpense,setreprortExpense] = useState (0)


  // onAddNewItem ที่รับ newItem เป็นอาร์กิวเมนต์ และเพิ่ม newItem
  //  ไปยังรายการ prevItem โดยใช้การกระจายข้อมูลในอาร์เรย์ใหม่
  const onAddNewItem = (newItem)=>{
    setItems((prevItem)=>{
      return [newItem,...prevItem]
       })
  }
 useEffect(()=>{
    const amounts =  items.map(items=>items.amount)
    const income =  amounts.filter(e=>e>0).reduce((sum,e)=>sum+=e,0)
    const expense =  amounts.filter(e=>e<0).reduce((sum,e)=>sum+=e,0)*-1
    setreprortIcome(income.toFixed(2))
    setreprortExpense(expense.toFixed(2))
 },[items,reprortIcome,reprortExpense])

 
 const [showReport,setshowReport] = useState(false)
 const reduce = (state,action)=>{
  switch(action.type){
    case "SHOW" :
      return setshowReport(true)
    case "HIDE" :
      return setshowReport(false)
  }
 }
 const [result,dispatch] = useReducer(reduce,showReport)

  return (
   <DataContext.Provider value={
    {
      income : reprortIcome,
      expense : reprortExpense
    }
   }>
     <div className="container">
    <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
    
    
    
    {/* {showReport && <ReportComponent/>} */}
    {/* <FormComponent onAddItem= {onAddNewItem}/>
    <Transaction items = {items}/> */}
    {/* <h1>{result}</h1>
    <button onClick={()=>dispatch({type:"SHOW"})}>แสดง</button>
    <button onClick={()=>dispatch({type:"HIDE"})}>ซ่อน</button> */}
    <Router>
      <div>
        <ul className="horizontal-menu">
          <li>
            <Link to="/">ข้อมูลบัญชี</Link>
          </li>
          <li>
            <Link to="/insert">บันทึกข้อมูล</Link>
          </li>
        </ul>
      </div>
      <Routes>
  <Route path="/" element={<ReportComponent />} />
  <Route path="insert" element={<FormComponent onAddItem={onAddNewItem}  />} />
  <Route path="insert" element={<Transaction items = {items}/> } />
  
</Routes>
    </Router>
   
    <Transaction items = {items}/>
    </div>
   </DataContext.Provider>
    
    
  );
}

export default App;
