  CREATE TABLE `cap` (
  `idCAP` int(11) NOT NULL,
  `IP` varchar(45) NOT NULL,
  PRIMARY KEY (`idCAP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `safecap`.`usuario` (
  `idUSUARIO` INT NOT NULL,
  `NOME` VARCHAR(45) NOT NULL,
  `EMAIL` VARCHAR(45) NOT NULL,
  `SENHA` VARCHAR(45) NOT NULL,
  `IDCAP` INT NOT NULL,
  PRIMARY KEY (`idUSUARIO`),
  INDEX `IDCAP_idx` (`IDCAP` ASC) VISIBLE,
  CONSTRAINT `IDCAP`
    FOREIGN KEY (`IDCAP`)
    REFERENCES `safecap`.`cap` (`idCAP`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `evento` (
  `idEVENTO` int(11) NOT NULL,
  `IDUSUARIO` int(11) NOT NULL,
  `IDCAP` int(11) NOT NULL,
  `ESTADO` varchar(45) NOT NULL,
  `BATIMENTOS` varchar(45) NOT NULL,
  `DTEVENTO` date DEFAULT NULL,
  PRIMARY KEY (`idEVENTO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
