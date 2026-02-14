import React from 'react';

const SectionHeader = ({ title, icon: Icon }) => (
    <div className="d-flex align-items-center mb-3 text-info">
        {Icon && <Icon className="me-2 fs-5" />}
        <h5 className="mb-0 fw-bold text-uppercase text-glow">{title}</h5>
    </div>
);

export default SectionHeader;