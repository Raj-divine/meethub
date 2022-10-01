import dayjs from "dayjs";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { db } from "../../../../firebase/firebaseConfig";

type FormData = {
  title: string;
  description: string;
  price: number | undefined;
  location: string;
  category: string | null;
  image: File | null;
  date: Date | null;
};

type FormErrors = {
  title: string;
  description: string;
  price: string;
  location: string;
  category: string;
  image: string;
  date: string;
};

interface submitHandlerArgs {
  event: FormEvent;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  error: FormErrors;
  setError: Dispatch<SetStateAction<FormErrors>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const submitHandler = async ({
  event,
  error,
  formData,
  setFormData,
  setError,
  setIsLoading,
}: submitHandlerArgs) => {
  event.preventDefault();
  const initialFormError = {
    title: "",
    description: "",
    price: "",
    location: "",
    category: "",
    image: "",
    date: "",
  };
  //validations
  const { title, description, price, location, category, image, date } =
    formData;
  if (title.trim().length < 1)
    setError({ ...initialFormError, title: "Title cannot be empty" });
  else if (location.trim().length < 1)
    setError({ ...initialFormError, location: "Location cannot be empty" });
  else if (location.trim().length < 5)
    setError({
      ...initialFormError,
      location: "Please enter a valid location",
    });
  else if (price === undefined)
    setError({
      ...initialFormError,
      price: "Please enter an entry fee or 0 for free entry",
    });
  else if (description.trim().length < 1)
    setError({
      ...initialFormError,
      description: "Description cannot be empty",
    });
  else if (description.trim().length < 30)
    setError({
      ...initialFormError,
      description: "Description Must be at least 30 characters long",
    });
  else if (!category)
    setError({ ...initialFormError, category: "Please select a category" });
  else if (!date)
    setError({ ...initialFormError, date: "Date cannot be empty" });
  else if (!image)
    setError({
      ...initialFormError,
      image: "Please select an image for your meetup",
    });
  else if (!image?.type.match("image.*"))
    setError({
      ...initialFormError,
      image: "You can only upload Images",
    });
  else if (image?.size > 3 * 1024 * 1024)
    setError({
      ...initialFormError,
      image: "Profile picture must be less than 3 MB",
    });
  else {
    setError(initialFormError);

    try {
      setIsLoading(true);
      const storage = getStorage();
      const storageRef = ref(storage, `meetup-images/${image?.name}`);

      const snapshot = await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "meetups"), {
        ...formData,
        image: imageUrl,
        date: dayjs(date).toISOString(),
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      if (error.code === "storage/unauthorized") {
        setError({
          ...initialFormError,
          image: "Something went wrong please try again with a different image",
        });
      }
      console.log(error.code);
    }
  }
};

export default submitHandler;