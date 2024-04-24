CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE
);

CREATE TABLE telefonos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    telefono VARCHAR(20) NOT NULL
);
CREATE TABLE contacto_telefono (
    contacto_id INT,
    telefono_id INT,
    FOREIGN KEY (contacto_id) REFERENCES Contactos(id) ON DELETE CASCADE,
    FOREIGN KEY (telefono_id) REFERENCES Telefonos(id) ON DELETE CASCADE
);
