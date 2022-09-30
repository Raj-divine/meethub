import styles from "./MeetupForm.module.scss";
import { ChangeEvent, useState } from "react";
import { TextInput, Select, NumberInput, Space, Textarea } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Button } from "../../Utilities";
const MeetupForm = () => {
  const initialFormState = {
    title: "",
    description: "",
    price: undefined,
    date: "",
    location: "",
    category: "",
    image: "",
  };
  type FormDataType = {
    title: string;
    description: string;
    price: number | undefined;
    date: string;
    location: string;
    category: string;
    image: string;
  };
  const [formData, setFormData] = useState<FormDataType>(initialFormState);

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  console.log(formData);

  return (
    <div className={styles["form-container"]}>
      <form className={styles.form}>
        <TextInput
          placeholder="Please enter the title"
          label="Title"
          variant="filled"
          value={formData.title}
          name="title"
          onChange={changeHandler.bind(this)}
        />
        <Space h="lg" />
        <TextInput
          placeholder="Please enter the location"
          label="Location"
          variant="filled"
          value={formData.location}
          name="location"
          onChange={changeHandler.bind(this)}
        />
        <Space h="lg" />

        <NumberInput
          value={formData.price}
          placeholder="Please enter the price of the ticket"
          label="Price"
          name="price"
          variant="filled"
          hideControls
          min={0}
          max={5000}
          onChange={(price) => {
            setFormData((prevData) => {
              return {
                ...prevData,
                price,
              };
            });
          }}
        />
        <Space h="lg" />

        <Textarea
          placeholder="Please write a description for you meetup"
          label="Description"
          autosize
          minRows={4}
          variant="filled"
          name="description"
          onChange={(e) => changeHandler(e)}
        />
        <Space h="xl" />

        <Button className={styles.button} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default MeetupForm;
