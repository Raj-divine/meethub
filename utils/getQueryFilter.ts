import dayjs from "dayjs";
import { WhereFilterOp } from "firebase/firestore";
import { NextRouter } from "next/router";

const getQueryFilter = (router: NextRouter) => {
  const tomorrow = dayjs(new Date()).add(1, "day").format("DD-MM-YY");
  const today = dayjs(new Date()).format("DD-MM-YY");
  const { filter } = router.query;
  let queryFilter: {
    field: string;
    value: string | number;
    opStr: WhereFilterOp;
  } = {
    value: "",
    opStr: "==",
    field: "",
  };
  if (filter === "free") {
    queryFilter.value = 0;
    queryFilter.opStr = "==";
    queryFilter.field = "price";
  } else if (filter === "paid") {
    queryFilter.value = 0;
    queryFilter.opStr = ">";
    queryFilter.field = "price";
  } else if (filter === "below-500") {
    queryFilter.value = 500;
    queryFilter.opStr = "<";
    queryFilter.field = "price";
  } else if (filter === "above-1000") {
    queryFilter.value = 1000;
    queryFilter.opStr = ">";
    queryFilter.field = "price";
  } else if (filter === "tomorrow") {
    queryFilter.value = tomorrow;
    queryFilter.opStr = "==";
    queryFilter.field = "dateInString";
  } else if (filter === "today") {
    queryFilter.value = today;
    queryFilter.opStr = "==";
    queryFilter.field = "dateInString";
  }

  return queryFilter;
};

export default getQueryFilter;
