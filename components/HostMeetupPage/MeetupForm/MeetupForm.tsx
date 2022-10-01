import styles from "./MeetupForm.module.scss";
import { ChangeEvent, useState } from "react";
import {
  TextInput,
  Select,
  NumberInput,
  Space,
  Textarea,
  FileInput,
  LoadingOverlay,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Button } from "../../Utilities";
import dayjs from "dayjs";
import { category } from "../../../fakeData";
import submitHandler from "./utils/submitHandler";

const MeetupForm = () => {
  // From data state and types
  const initialFormState = {
    title: "",
    description: "",
    price: undefined,
    location: "",
    category: "",
    image: null,
    date: dayjs(new Date()).add(1, "day").toDate(),
  };
  type FormDataType = {
    title: string;
    description: string;
    price: number | undefined;
    location: string;
    category: string | null;
    image: File | null;
    date: Date | null;
  };
  const [formData, setFormData] = useState<FormDataType>(initialFormState);

  const initialFormError = {
    title: "",
    description: "",
    price: "",
    location: "",
    category: "",
    image: "",
    date: "",
  };

  const [error, setError] = useState(initialFormError);

  const [isLoading, setIsLoading] = useState(false);

  const categoryData = category.map((category) => {
    return {
      value: category.toLowerCase(),
      label: category,
    };
  });

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

  return (
    <div className={styles["form-container"]}>
      <form
        noValidate
        onSubmit={(event) => {
          submitHandler({
            event,
            formData,
            setFormData,
            error,
            setError,
            setIsLoading,
          });
        }}
        className={styles.form}
      >
        <LoadingOverlay visible={isLoading} overlayBlur={2} />

        <TextInput
          placeholder="Please enter the title"
          label="Title"
          variant="filled"
          value={formData.title}
          name="title"
          onChange={changeHandler.bind(this)}
          error={error.title}
        />
        <Space h="lg" />
        <TextInput
          placeholder="Please enter the location"
          label="Location"
          variant="filled"
          value={formData.location}
          name="location"
          onChange={changeHandler.bind(this)}
          error={error.location}
        />
        <Space h="lg" />

        <Select
          label="Category"
          placeholder="Select a category for you meetup"
          data={categoryData}
          value={formData.category}
          variant="filled"
          onChange={(category) =>
            setFormData((prevData) => {
              return {
                ...prevData,
                category,
              };
            })
          }
        />

        <Space h="lg" />
        <div className={styles.flex}>
          <div className={styles["w-set"]}>
            <DatePicker
              placeholder="Pick a date"
              value={formData.date}
              variant="filled"
              label="Date"
              minDate={dayjs(new Date()).add(1, "day").toDate()}
              maxDate={dayjs(new Date()).add(6, "months").toDate()}
              onChange={(date) =>
                setFormData((prevData) => {
                  return {
                    ...prevData,
                    date,
                  };
                })
              }
              name="date"
              error={error.date}
            />
          </div>

          <Space w="lg" />
          <Space h="lg" />

          <div className={styles["w-set"]}>
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
              error={error.price}
            />
          </div>
        </div>

        <Space h="lg" />
        <FileInput
          name="image"
          placeholder="Please upload an image for your meetup"
          label="Image"
          variant="filled"
          value={formData.image}
          onChange={(image) =>
            setFormData((prevData) => {
              return {
                ...prevData,
                image,
              };
            })
          }
          accept="image/png,image/jpeg"
          error={error.image}
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
          error={error.description}
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
