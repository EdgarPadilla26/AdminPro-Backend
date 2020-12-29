
const getMenu = (rol = 'USER_ROL')=>{
    const menu = [
        {
          title: 'Principal',
          icon: 'mdi mdi-gauge',
          submenu: [
            {title: 'Inicio', url: '/' },
            {title: 'ProgressBar', url: 'progress' },
            {title: 'Graficas', url: 'grafica1' },
            {title: 'Promise', url: 'promesa' },
            {title: 'RXJS', url: 'rxjs' },
          ]
          
        },
        {
          title: 'Mantenimiento',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            //{title: 'Usuarios', url: 'usuarios' },
            {title: 'Medicos', url: 'medicos' },
            {title: 'Hospitales', url: 'hospitales' },
          ]
        }
      ];

      if(rol==='ADMIN_ROL'){
        menu[1].submenu.unshift({title: 'Usuarios', url: 'usuarios' });
      }

      return menu;
}

module.exports = {
    getMenu,
}