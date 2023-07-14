const urlTortue = "/api/v1/tortue";
const urlAuth = "/api/v1/auth";


export default class API {

  
  static async getAllTortues() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(urlTortue, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getTortueById(id) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${urlTortue}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async createTortue(tortue) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(urlTortue, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: tortue,
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async updateTortue(id, tortue) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${urlTortue}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: tortue,
      });
      const data = await res.json();
      console.log(urlTortue);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async deleteTortue(id) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${urlTortue}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  static async signup(user) {
    const res = await fetch(`${urlAuth}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  }

  static async login(user) {
    const res = await fetch(`${urlAuth}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  }
  static async getAllUsers() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${urlAuth}/about`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

