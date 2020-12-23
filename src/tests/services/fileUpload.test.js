import '@testing-library/jest-dom';
import cloudinary from 'cloudinary'
import { fileUpload } from '../../services/fileUpload';

cloudinary.config({ 
    cloud_name: 'dcq6yz0wz', 
    api_key: '144982254556415', 
    api_secret: 'FrctzwoDKBuxIzMOFO8coTZqVw0' 
});

describe('Pruebas en el fileUpload.js', () => {
    
    test('Debe de cargar un archivo', async ( done ) => {
        
        const response = await fetch('https://cde.laprensa.e3.pe/ima/0/0/2/3/8/238082.jpg');
        const blob = await response.blob();

        const file = new File([ blob ], 'foto.jpg');
        const url = await fileUpload( file );

        expect( typeof url ).toBe( 'string' );

        // Borrar imagen por ID
        const segments = url.split( '/' );
        const imageID = segments[ segments.length -1 ].split( '.' )[0];

        cloudinary.v2.api.delete_resources( imageID, {}, () => {
            done();
        });
    });

    test('Debe de cargar un archivo', async () => {
        
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );

        expect( url ).toBe( null );
    })
    
})
