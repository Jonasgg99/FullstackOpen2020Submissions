import React from 'react'
//import { useDispatch } from 'react-redux'//
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  //const dispatch = useDispatch()//

  const handleChange = (event) => {
    event.preventDefault()
    props.filterChange(event.target.value)
    //dispatch(filterChange(event.target.value))//
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { filterChange }
)(Filter)
//export default Filter//