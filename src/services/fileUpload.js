

export const fileUpload = async ( file ) => {
    
    const cloudyURL = 'https://api.cloudinary.com/v1_1/dcq6yz0wz/upload';
    const formData = new FormData();
    formData.append( 'upload_preset', 'react-journal' );
    formData.append( 'file', file );

    try {

        const response = await fetch( cloudyURL, {
            method: 'POST',
            body: formData
        });

        if ( response.ok ) {

            const cloudyResponse = await response.json();
            return cloudyResponse.secure_url;
        } else {

            // throw await response.json();
            return null;
        }
        
    } catch (error) {
        
        throw error;
    }
}
