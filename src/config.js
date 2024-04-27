export const config = {
   api_url: 'https://freeapi.gerasim.in/api/'
   //api_url: 'https://localhost:44355/api/'
}
// export const fetchData = async (path, token) => {
//    const headers = {
//      Authorization: `Bearer ${token}`,
//      'Content-Type': 'application/json',
//    };
 
//    try {
//      const response = await fetch(`${config.api_url}${path}`, {
//        headers,
//      });
 
//      if (!response.ok) {
//        throw new Error('Failed to fetch data');
//      }
 
//      return response.json();
//    } catch (error) {
//      console.error('Error fetching data:', error);
//      throw error;
//    }
//  };