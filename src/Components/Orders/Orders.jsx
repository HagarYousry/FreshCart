import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Orders() {
  
  const navigate= useNavigate()
  useEffect(() => {
    navigate("/")

  }, [])
}
