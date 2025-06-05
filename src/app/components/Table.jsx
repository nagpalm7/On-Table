import React from 'react'

const Table = ({header, rows}) => {

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            {
                                header.map((col, index) => (
                                    <th key={index}>{col}</th>
                                ))
                            } 
                            <th>Actions</th>  
                        </tr>
                    </thead>
                    <tbody>
                    {
                        rows.map((row, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                {   
                                    header.map((col, cellIndex) => (
                                        <td key={cellIndex}>{row[col]}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            {
                                header.map((col, index) => (
                                    <th key={index}>{col}</th>
                                ))
                            }
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Table