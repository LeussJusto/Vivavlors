import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <nav style={{ width: '250px', background: '#1a1a1a', padding: '20px', height: '100vh' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {['dashboard', 'productos', 'servicios', 'clientes', 'reportes'].map((item) => (
          <li key={item} style={{ margin: '15px 0' }}>
            <NavLink
              to={item}
              style={({ isActive }) => ({
                color: isActive ? '#00FF7F' : '#FFFFFF',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: isActive ? 'bold' : 'normal',
                padding: '10px 15px',
                display: 'block',
                borderRadius: '5px',
                transition: 'background 0.3s',
              })}
              activeStyle={{
                background: '#333333',
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
