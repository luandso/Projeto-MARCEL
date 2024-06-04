create database futebol;

use futebol;

CREATE TABLE tbl_times_futebol (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clube VARCHAR(100) NOT NULL,
    ano_fundacao INT NOT NULL,
    estadio VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    preco_minimo FLOAT NOT NULL,
    data_inicio DATETIME NOT NULL,
    data_fim DATETIME NOT NULL
);


INSERT INTO tbl_times_futebol (clube, ano_fundacao, estadio, cidade, preco_minimo, data_inicio, data_fim) VALUES
('Flamengo', 1895, 'Maracanã', 'Rio de Janeiro', 50000.00, '2024-07-01 09:00:00', '2024-07-03 17:00:00'),
('Corinthians', 1910, 'Arena Corinthians', 'São Paulo', 48000.00, '2024-07-05 10:00:00', '2024-07-07 18:00:00');

