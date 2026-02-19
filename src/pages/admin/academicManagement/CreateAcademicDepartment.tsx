/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api.";
import { academicDepartmentSchema } from "../../../schemas/academicManagament.schema";
import type { TFaculty, TResponse } from "../../../types";
import type { TAcademicFaculty } from "../../../types/academicManagemeny.type";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const { data: facultyData } = useGetAllAcademicFacultiesQuery(undefined);

  const facultyOptions = facultyData?.data.map((faculty: TFaculty) => ({
    // label: faculty._id + " - " + faculty.name,
    label: faculty.name,
    value: faculty._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic department...");

    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      const res = (await addAcademicDepartment(
        departmentData
      )) as TResponse<TAcademicFaculty>;

      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Academic faculty created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to create academic department", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHInput type="text" name="name" label="Department Name" />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={facultyOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
