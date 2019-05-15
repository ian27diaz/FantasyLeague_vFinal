let { mongoose } = require('./mongodb-connect');

let futbolistaSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    foto: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    posiciones: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    club: {
        type: String,
        required: true
    },
    competicion: {
        type: String,
    },
    nacionalidad: {
        type: String
    },
    uniforme: {
        type: String
    }
});


let Futbolista = mongoose.model('futbolistas', futbolistaSchema);


// let futbolistas = [
//     new Futbolista(0, 'default', 'assets/images/Futbolistas/Futbolista-default.png', 0, '', 0, '', '', '', ''),
//     new Futbolista(1, 'Handanovic', 'assets/images/Futbolistas/Futbolista-1.png', 34, 'PO', 6, 'Inter', 'Serie A', 'Eslovenia', 'assets/images/Uniformes/Uniforme-2.png'),
//     new Futbolista(7, 'Neuer', 'assets/images/Futbolistas/Futbolista-7.png', 33, 'PO', 22, 'Bayern Munchen', 'Bundesliga', 'Alemania', 'assets/images/Uniformes/Uniforme-21.png'),
//     new Futbolista(11, 'Buffon', 'assets/images/Futbolistas/Futbolista-11.png', 41, 'PO', 1, 'PSG', 'Ligue 1', 'Italia', 'assets/images/Uniformes/Uniforme-39.png'),
//     new Futbolista(16, 'De Gea', 'assets/images/Futbolistas/Futbolista-16.png', 28, 'PO', 70, 'Manchester United', 'Premier League', 'España', 'assets/images/Uniformes/Uniforme-62.png'),
//     new Futbolista(26, 'Florenzi', 'assets/images/Futbolistas/Futbolista-26.png', 28, 'LD-DFD-MD-MC-ED', 30, 'Roma', 'Serie A', 'Italia', 'assets/images/Uniformes/Uniforme-5.png'),
//     new Futbolista(36, 'Meunier', 'assets/images/Futbolistas/Futbolista-36.png', 27, 'LD-DFD-MD-MI', 35, 'PSG', 'Ligue 1', 'Bélgica', 'assets/images/Uniformes/Uniforme-39.png'),
//     new Futbolista(37, 'Dani Alves', 'assets/images/Futbolistas/Futbolista-37.png', 35, 'LD-DFD-MD-ED', 5, 'PSG', 'Ligue 1', 'Brasil', 'assets/images/Uniformes/Uniforme-39.png'),
//     new Futbolista(41, 'Azpilicueta', 'assets/images/Futbolistas/Futbolista-41.png', 28, 'DFD-DFC', 50, 'Chelsea', 'Premier League', 'España', 'assets/images/Uniformes/Uniforme-63.png'),
//     new Futbolista(51, 'Chiellini', 'assets/images/Futbolistas/Futbolista-51.png', 35, 'DFC', 20, 'Juventus', 'Serie A', 'Italia', 'assets/images/Uniformes/Uniforme-1.png'),
//     new Futbolista(53, 'Bonucci', 'assets/images/Futbolistas/Futbolista-53.png', 31, 'DFC', 40, 'Juventus', 'Serie A', 'Italia', 'assets/images/Uniformes/Uniforme-1.png'),
//     new Futbolista(55, 'Skriniar', 'assets/images/Futbolistas/Futbolista-55.png', 25, 'DFC', 75, 'Inter', 'Serie A', 'Eslovaquia', 'assets/images/Uniformes/Uniforme-2.png'),
//     new Futbolista(71, 'Thiago Silva', 'assets/images/Futbolistas/Futbolista-71.png', 34, 'DFC', 25, 'PSG', 'Ligue 1', 'Brasil', 'assets/images/Uniformes/Uniforme-39.png'),
//     new Futbolista(82, 'Van Dijk', 'assets/images/Futbolistas/Futbolista-82.png', 27, 'DFC', 100, 'Liverpool', 'Premier League', 'Holanda', 'assets/images/Uniformes/Uniforme-60.png'),
//     new Futbolista(90, 'David Luiz', 'assets/images/Futbolistas/Futbolista-90.png', 30, 'DFC-MCD', 30, 'PSG', 'Premier League', 'Brasil', 'assets/images/Uniformes/Uniforme-39.png'),
//     new Futbolista(91, 'Sergio Ramos', 'assets/images/Futbolistas/Futbolista-91.png', 31, 'DFD-DFC', 60, 'Real Madrid', 'LaLiga', 'España', 'assets/images/Uniformes/Uniforme-80.png'),
//     new Futbolista(94, 'Pique', 'assets/images/Futbolistas/Futbolista-94.png', 32, 'DFC', 35, 'Barcelona', 'LaLiga', 'España', 'assets/images/Uniformes/Uniforme-79.png'),
//     new Futbolista(106, 'Alaba', 'assets/images/Futbolistas/Futbolista-106.png', 28, 'DFC-DFI-MCD', 50, 'Bayern Munchen', 'Bundesliga', 'Austria', 'assets/images/Uniformes/Uniforme-21.png'),
//     new Futbolista(116, 'Marcos Alonso', 'assets/images/Futbolistas/Futbolista-116.png', 27, 'DFI-LI-MD-MI', 50, 'Chelsea', 'Premier League', 'España', 'assets/images/Uniformes/Uniforme-63.png'),
//     new Futbolista(121, 'Marcelo', 'assets/images/Futbolistas/Futbolista-121.png', 33, 'DFI', 20, 'Real Madrid', 'LaLiga', 'Brasil', 'assets/images/Uniformes/Uniforme-80.png'),
//     new Futbolista(123, 'Filipe Luis', 'assets/images/Futbolistas/Futbolista-123.png', 33, 'DFI', 10, 'Atletico Madrid', 'LaLiga', 'Brasil', 'assets/images/Uniformes/Uniforme-81.png'),
//     new Futbolista(127, 'Pjanic', 'assets/images/Futbolistas/Futbolista-127.png', 28, 'MC', 75, 'Juventus', 'Serie A', 'Bosnia', 'assets/images/Uniformes/Uniforme-1.png'),
//     new Futbolista(133, 'Nainggolan', 'assets/images/Futbolistas/Futbolista-133.png', 30, 'MC-MCO', 30, 'Inter', 'Serie A', 'Bélgica', 'assets/images/Uniformes/Uniforme-2.png'),
//     new Futbolista(135, 'De Rossi', 'assets/images/Futbolistas/Futbolista-135.png', 35, 'DFC-MCD', 5, 'Roma', 'Serie A', 'Italia', 'assets/images/Uniformes/Uniforme-5.png'),
//     new Futbolista(136, 'Gotze', 'assets/images/Futbolistas/Futbolista-136.png', 27, 'MC-MCO-MP', 35, 'Borussia Dortmund', 'Bundesliga', 'Alemania', 'assets/images/Uniformes/Uniforme-22.png'),
//     new Futbolista(146, 'Verratti', 'assets/images/Futbolistas/Futbolista-146.png', 26, 'MC', 65, 'PSG', 'Ligue 1', 'Italia', 'assets/images/Uniformes/Uniforme-39.png'),
//     new Futbolista(157, 'Kante', 'assets/images/Futbolistas/Futbolista-157.png', 28, 'MCD-MC', 80, 'Chelsea', 'Premier League', 'Francia', 'assets/images/Uniformes/Uniforme-63.png'),
//     new Futbolista(159, 'Erikssen', 'assets/images/Futbolistas/Futbolista-159.png', 26, 'MC-MCO', 85, 'Tottenham', 'Premier League', 'Dinamarca', 'assets/images/Uniformes/Uniforme-61.png'),
//     new Futbolista(160, 'De Bruyne', 'assets/images/Futbolistas/Futbolista-160.png', 27, 'MC-MCO', 120, 'Manchester City', 'Premier League', 'Bélgica', 'assets/images/Uniformes/Uniforme-59.png'),
//     new Futbolista(162, 'Pogba', 'assets/images/Futbolistas/Futbolista-162.png', 28, 'MC', 120, 'Manchester United', 'Premier League', 'Francia', 'assets/images/Uniformes/Uniforme-62.png'),
//     new Futbolista(167, 'Modric', 'assets/images/Futbolistas/Futbolista-167.png', 33, 'MC', 40, 'Real Madrid', 'LaLiga', 'Croacia', 'assets/images/Uniformes/Uniforme-80.png'),
//     new Futbolista(171, 'Busquets', 'assets/images/Futbolistas/Futbolista-171.png', 32, 'MCD', 40, 'Barcelona', 'LaLiga', 'España', 'assets/images/Uniformes/Uniforme-79.png'),
//     new Futbolista(175, 'Vidal', 'assets/images/Futbolistas/Futbolista-175.png', 32, 'MCD-MC', 20, 'Barcelona', 'LaLiga', 'Chile', 'assets/images/Uniformes/Uniforme-79.png'),
//     new Futbolista(185, 'Ronaldo', 'assets/images/Futbolistas/Futbolista-185.png', 33, 'DC-EI', 100, 'Juventus', 'Serie A', 'Portugal', 'assets/images/Uniformes/Uniforme-1.png'),
//     new Futbolista(191, 'Reus', 'assets/images/Futbolistas/Futbolista-191.png', 29, 'MI-MCO-MP-EI', 65, 'Borussia Dortmund', 'Bundesliga', 'Alemania', 'assets/images/Uniformes/Uniforme-22.png'),
//     new Futbolista(201, 'Lewandowski', 'assets/images/Futbolistas/Futbolista-201.png', 30, 'DC', 70, 'Bayern Munchen', 'Bundesliga', 'Polonia', 'assets/images/Uniformes/Uniforme-21.png'),
//     new Futbolista(207, 'Neymar', 'assets/images/Futbolistas/Futbolista-207.png', 26, 'EI-MP', 250, 'PSG', 'Ligue 1', 'Brasil', 'assets/images/Uniformes/Uniforme-39.png'),
//     new Futbolista(208, 'Mbappe', 'assets/images/Futbolistas/Futbolista-208.png', 21, 'ED-DC', 300, 'PSG', 'Ligue 1', 'Francia', 'assets/images/Uniformes/Uniforme-39.png'),
//     new Futbolista(223, 'Salah', 'assets/images/Futbolistas/Futbolista-223.png', 26, 'ED-MP', 150, 'Liverpool', 'Premier League', 'Egipto', 'assets/images/Uniformes/Uniforme-60.png'),
//     new Futbolista(228, 'Hazard', 'assets/images/Futbolistas/Futbolista-228.png', 27, 'EI-MP', 140, 'Chelsea', 'Premier League', 'Bélgica', 'assets/images/Uniformes/Uniforme-63.png'),
//     new Futbolista(234, 'Kane', 'assets/images/Futbolistas/Futbolista-234.png', 25, 'DC', 120, 'Tottenham', 'Premier League', 'Inglaterra', 'assets/images/Uniformes/Uniforme-61.png'),
//     new Futbolista(236, 'Messi', 'assets/images/Futbolistas/Futbolista-236.png', 31, 'MCO-ED-MP', 350, 'Barcelona', 'LaLiga', 'Argentina', 'assets/images/Uniformes/Uniforme-79.png'),
//     new Futbolista(238, 'Suarez', 'assets/images/Futbolistas/Futbolista-238.png', 32, 'MP-DC', 65, 'Barcelona', 'LaLiga', 'Uruguay', 'assets/images/Uniformes/Uniforme-79.png'),
//     new Futbolista(242, 'Griezmann', 'assets/images/Futbolistas/Futbolista-242.png', 27, 'ED-MP-DC-EI', 130, 'Atletico Madrid', 'LaLiga', 'Francia', 'assets/images/Uniformes/Uniforme-81.png'),
//     new Futbolista(244, 'Bale', 'assets/images/Futbolistas/Futbolista-244.png', 30, 'ED-MP-DC', 70, 'Real Madrid', 'LaLiga', 'Gales', 'assets/images/Uniformes/Uniforme-80.png')
// ];

module.exports = { Futbolista };