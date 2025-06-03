"use client";

import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";

const Toast = ({
  message,
  time = 3000,
  position = "toast-top toast-right",
  type = "alert-success alert-soft",
  icon = <FaCheckCircle className='h-5 w-5' />
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), time);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={"toast my-[10vh] z-100" + ` ${position}`}>
      <div className={"alert" + ` ${type}`}>
        {icon}
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Toast;