"use server";
import Link from 'next/link'
import React from 'react'

const Table = ({ header, rows, deleteAction = null, actions = [], showActions = true }) => {
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
                                    <th>
                                        <div className="flex gap-2">
                                            {actions &&
                                                actions.map((action, idx) => (
                                                    <Link href={`${action.link}${row.ID}`} key={idx}>
                                                        <button className="btn btn-xs btn-soft btn-primary">{action.text}</button>
                                                    </Link>
                                                ))
                                            }
                                            {showActions &&
                                                <>
                                                    <Link href={`edit/${row.ID}`}>
                                                        <button className="btn btn-xs btn-soft btn-primary">Edit</button>
                                                    </Link>
                                                    <form action={deleteAction}>
                                                        <input type="hidden" name="id" value={row.ID} />
                                                        <button className="btn btn-xs btn-soft btn-error">Delete</button>
                                                    </form>
                                                </>
                                            }
                                        </div>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            {
                                header.map((col, index) => {
                                    if (col !== "ID") return (<th key={index}>{col}</th>)
                                })
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