'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Municao', [
      {
        esportista_id: 1,
        nome: 'CARTUCHO CBC 22LR CHOG 40GR STANDARD',
        calibre: '.22LR',
        tipo: 'Munição de Uso Permitido Fogo Cicular',
        marca:'CBC',
        origem: 'BRA',
        createdAt: new Date(),
        updatedAt: new Date()        
      },  
      {
        esportista_id: 1,
        nome: 'CARTUCHO CBC 22LR CHPO HP PROJ P OCA 33GR',
        calibre: '.22LR',
        tipo: 'Munição de Uso Permitido Fogo Cicular',
        marca:'CBC',
        origem: 'BRA',
        createdAt: new Date(),
        updatedAt: new Date()        
      },  
      {
        esportista_id: 1,
        nome: 'MUNICAO CBC 22LR CHOG 40GR TARGET',
        calibre: '.22LR',
        tipo: 'Munição de Uso Permitido Fogo Cicular',
        marca:'CBC',
        origem: 'BRA',
        createdAt: new Date(),
        updatedAt: new Date()        
      }, 
      {
        esportista_id: 1,
        nome: 'CARTUCHO ELEY MATCH 22 RF LONG RIFLE',
        calibre: '.22LR',
        tipo: 'Munição de Uso Permitido Fogo Cicular',
        marca:'ELEY',
        origem: 'ENG',
        createdAt: new Date(),
        updatedAt: new Date()        
      }, 
      {
        esportista_id: 1,
        nome: 'CARTUCHO ELEY LR PISTOL',
        calibre: '.22LR',
        tipo: 'Munição de Uso Permitido Fogo Cicular',
        marca:'ELEY',
        origem: 'ENG',
        createdAt: new Date(),
        updatedAt: new Date()        
      },  
      {
        esportista_id: 1,
        nome: 'CARTUCHO ELEY PISTOL STANDARD',
        calibre: '.22LR',
        tipo: 'Munição de Uso Permitido Fogo Cicular',
        marca:'ELEY',
        origem: 'ENG',
        createdAt: new Date(),
        updatedAt: new Date()        
      },                             
      {
        esportista_id: 1,
        nome: 'CART ELEY .22 TENEX PISTOL C',
        calibre: '.22LR',
        tipo: 'Munição de Uso Permitido Fogo Cicular',
        marca:'ELEY',
        origem: 'ENG',
        createdAt: new Date(),
        updatedAt: new Date()        
      }, 
      {
        esportista_id: 1,
        nome: 'CART ELEY .22 MATCH PISTOL SLOW C',
        calibre: '.22LR',
        tipo: 'Munição de Uso Permitido Fogo Cicular',
        marca:'ELEY',
        origem: 'ENG',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        esportista_id: 1,
        nome: 'MUNIÇÃO CBC 38SPL EXPO 158GR BLST C',
        calibre: '.38SPL',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca:'CBC',
        origem: 'BRA',
        createdAt: new Date(),
        updatedAt: new Date()        
      }, 
      {
        esportista_id: 1,
        nome: 'MUN CBC 38SPL EOPP 158GR NTA C',
        calibre: '.38SPL',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca:'CBC',
        origem: 'BRA',
        createdAt: new Date(),
        updatedAt: new Date()        
      },           
      {
        esportista_id: 1,
        nome: 'MUN CBC 380 AUTO ETOG 95GR',
        calibre: '.380AUTO',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca:'CBC',
        origem: 'BRA',
        createdAt: new Date(),
        updatedAt: new Date()        
      }, 
      {
        esportista_id: 1,
        nome: 'MUN CBC 380 AUTO TREINA CHOG 95GR C',
        calibre: '.380AUTO',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca:'CBC',
        origem: 'BRA',
        createdAt: new Date(),
        updatedAt: new Date()        
      }, 
      {
        esportista_id: 1,
        nome: 'MUNIÇÃO CBC GOLD HEX .380 AUTO EXPO +P 85GR',
        calibre: '.380AUTO',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca:'CBC',
        origem: 'BRA',
        createdAt: new Date(),
        updatedAt: new Date()        
      },      
      {
        esportista_id: 1,
        nome: 'MUN CBC 40SW ETPP 180GR C',
        calibre: '.40SW',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca:'CBC',
        origem: 'BRA',
        createdAt: new Date(),
        updatedAt: new Date()        
      },      
      {
        esportista_id: 1,
        nome: 'MUNICAO CBC 40SW EOPP 180GR NTA CX',
        calibre: '.40SW',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca:'CBC',
        origem: 'BRA',
        createdAt: new Date(),
        updatedAt: new Date()        
      },   
      {
        esportista_id: 1,
        nome: 'MUNICAO CBC 45AUTO ETOG 230GR CX',
        calibre: '.45AUTO',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca:'CBC',
        origem: 'BRA',
        createdAt: new Date(),
        updatedAt: new Date()        
      }, 
      {
        esportista_id: 1,
        nome: 'MUN CBC 9MM EOOG 124GR NTA C',
        calibre: '9MM',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca:'CBC',
        origem: 'BRA',
        createdAt: new Date(),
        updatedAt: new Date()        
      }, 
      {
        esportista_id: 1,
        nome: 'MUNICAO CCI 9MM 124GR FMJ BLAZER BRASS',
        calibre: '9MM',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca:'CCI',
        origem: 'USA',
        createdAt: new Date(),
        updatedAt: new Date()        
      }, 
      {
        esportista_id: 1,
        nome: 'MUNICAO SB 9MM FMJ 124GR C',
        calibre: '9MM',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca:'S&B',
        origem: 'USA',
        createdAt: new Date(),
        updatedAt: new Date()        
      },  
      {
        esportista_id: 1,
        nome: 'MUNIÇÃO RECARREGADA 38 SPL PONTA EXPP 158GR',
        calibre: '.38SPL',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca: null,
        origem: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      },          
      {
        esportista_id: 1,
        nome: 'MUNIÇÃO RECARREGADA 38 SPL PONTA POG',
        calibre: '.38SPL',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca: null,
        origem: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      }, 
      {
        esportista_id: 1,
        nome: 'MUNIÇÃO RECARREGADA .380 AUTO PONTA POG 95GR',
        calibre: '.380AUTO',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca: null,
        origem: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      },      
      {
        esportista_id: 1,
        nome: 'MUNIÇÃO RECARREGADA .380 AUTO EXPO 95GR',
        calibre: '.380AUTO',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca: null,
        origem: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      },       
      {
        esportista_id: 1,
        nome: 'MUNIÇÃO RECARREGADA 40SW PONTA POG 180GR',
        calibre: '.40SW',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca: null,
        origem: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      },  
      {
        esportista_id: 1,
        nome: 'MUNIÇÃO RECARREGADA 40SW PONTA ETPP 180GR',
        calibre: '.40SW',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca: null,
        origem: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      },       
      {
        esportista_id: 1,
        nome: 'MUNIÇÃO RECARREGADA 45AUTO ETOG 230GR',
        calibre: '.45AUTO',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca: null,
        origem: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      },       
      {
        esportista_id: 1,
        nome: 'MUNIÇÃO RECARREGADA 45AUTO POG 230GR',
        calibre: '.45AUTO',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca: null,
        origem: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        esportista_id: 1,
        nome: 'MUNIÇÃO RECARREGADA 9MM PPP 125GR',
        calibre: '9MM',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca: null,
        origem: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      },      
      {
        esportista_id: 1,
        nome: 'MUNIÇÃO RECARREGADA 9MM ETOG 125GR',
        calibre: '9MM',
        tipo: 'Munição de Uso Permitido Fogo Central',
        marca: null,
        origem: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      }      
    ], { });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Municao', null, {});
  }
};
