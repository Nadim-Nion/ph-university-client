/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api.";
import { academicFacultySchema } from "../../../schemas/academicManagament.schema";
import type { TResponse } from "../../../types";
import type { TAcademicFaculty } from "../../../types/academicManagemeny.type";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log("🚀 ~ onSubmit ~ data:", data);

    const facultyData = { name: data.name };

    const toastId = toast.loading("Creating academic faculty ...");

    try {
      const res = (await addAcademicFaculty(facultyData)) as TResponse<TAcademicFaculty>;

      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Academic faculty created successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to create academic faculty", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHInput type="text" name="name" label="Faculty Name" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
