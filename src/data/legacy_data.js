const get_data = async () => {
      const temp = [];
      for (let i = 0; i < selected_location.length; i++) {
        const res_data = await axios.get(
          query_string + "type=1&option=" + selected_location[i].name
        );
        const data = res_data.data.station
        temp.push(...data);
      }
      setStations(temp);
    };