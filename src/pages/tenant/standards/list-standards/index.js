import { Button } from "@mui/material";
import { CippTablePage } from "/src/components/CippComponents/CippTablePage.jsx";
import { Layout as DashboardLayout } from "/src/layouts/index.js"; // had to add an extra path here because I added an extra folder structure. We should switch to absolute pathing so we dont have to deal with relative.
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";
import { CopyAll, Delete, PlayArrow } from "@mui/icons-material";

const Page = () => {
  const pageTitle = "Standard Templates";
  const actions = [
    {
      label: "Edit Template",
      //when using a link it must always be the full path /identity/administration/users/[id] for example.
      link: "/tenant/standards/template?id=[GUID]",
      icon: <EyeIcon />,
      color: "success",
      target: "_self",
    },
    {
      label: "Clone & Edit Template",
      link: "/tenant/standards/template?id=[GUID]&clone=true",
      icon: <CopyAll />,
      color: "success",
      target: "_self",
    },
    {
      label: "Run Template Now (Currently Selected Tenant only)",
      type: "GET",
      url: "/api/ExecStandardsRun",
      icon: <PlayArrow />,
      data: {
        TemplateId: "GUID",
      },
      confirmText: "Are you sure you want to force a run of this template?",
      multiPost: false,
    },
    {
      label: "Run Template Now (All Tenants in Template)",
      type: "GET",
      url: "/api/ExecStandardsRun",
      icon: <PlayArrow />,
      data: {
        TemplateId: "GUID",
        tenantFilter: "allTenants",
      },
      confirmText: "Are you sure you want to force a run of this template?",
      multiPost: false,
    },
    {
      label: "Delete Template",
      type: "POST",
      url: "/api/RemoveStandardTemplate",
      icon: <Delete />,
      data: {
        ID: "GUID",
      },
      confirmText: "Are you sure you want to delete this template?",
      multiPost: false,
    },
  ];

  return (
    <CippTablePage
      title={pageTitle}
      apiUrl="/api/listStandardTemplates"
      cardButton={
        <Button component={Link} href="template">
          Add Template
        </Button>
      }
      actions={actions}
      simpleColumns={[
        "templateName",
        "tenantFilter",
        "excludedTenants",
        "updatedAt",
        "updatedBy",
        "runManually",
      ]}
      queryKey="listStandardTemplates"
    />
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
