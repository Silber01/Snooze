import { Box, Button, Text, Image, Grid, GridItem, Center } from "@chakra-ui/react";

function StarRating({ rating }) {

    function getStar(rating, place) {
        let thisRating = rating - place + 0.00001;
        if (thisRating <= 0) return 0;
        else if (thisRating >= 1) return 10;
        return ("" + thisRating * 10).substring(0, 1);
      }


    return (
        <Grid templateColumns="repeat(5, 1fr)" gap={1}>
        <Image
          src={"../../assets/stars/" + getStar(rating, 0) + ".png"}
          width="2em"
        />
        <Image
          src={"../../assets/stars/" + getStar(rating, 1) + ".png"}
          width="2em"
        />
        <Image
          src={"../../assets/stars/" + getStar(rating, 2) + ".png"}
          width="2em"
        />
        <Image
          src={"../../assets/stars/" + getStar(rating, 3) + ".png"}
          width="2em"
        />
        <Image
          src={"../../assets/stars/" + getStar(rating, 4) + ".png"}
          width="2em"
        />
        
      </Grid>
    )
}

export default StarRating;