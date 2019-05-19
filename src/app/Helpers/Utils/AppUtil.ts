export default class AppUtil
{
   public static calculateAge(ageInMs:number): number {

      const birthDate = new Date(ageInMs);
      const currentDate = new Date();

      let age = currentDate.getFullYear() - birthDate.getFullYear();
      let months = currentDate.getMonth() - birthDate.getMonth();

      if (months < 0 || (months === 0 && currentDate.getDate() < birthDate.getDate())) {
         age--;
      }

      return age;

   }
}
