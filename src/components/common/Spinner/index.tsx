import React from 'react'

const Spinner = ({ done }: { done: boolean }) => {
    return (
        <div className="loading-overlay" id="loadingOverlay" style={{ display: done ? 'none' : 'flex' }}>
            <div className="spinner"></div>
        </div>

    )
}

export default Spinner