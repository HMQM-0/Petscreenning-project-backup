import { builder, Builder, BuilderComponent } from "@builder.io/react";
import * as React from "react";
import { Breadcrumb } from "../../components";

export interface IBuilderPageProps {
  breadcrumbs: Breadcrumb[];
  headerImage: string | null;
  page: {
    contentJson: any;
    title: string;
  };
}

const NoComponent: React.FunctionComponent = (props) => {
  return <>404</>;
};

const BuilderPage: React.FunctionComponent<IBuilderPageProps> = (props) => {
  const [pageJson, setPage] = React.useState();
  // @ts-ignore
  const [isLoading, setLoading] = React.useState(false);
  const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;

  React.useMemo(() => {
    if (!isEditingOrPreviewing) {
      const fetchPage = async () => {
        setLoading(true);
        const path = window.location.pathname;
        const content = await builder.get("page", { url: path }).promise();
        setPage(content);
        setLoading(false);
      };

      fetchPage();
    }
  }, []);

  // @ts-ignore
  const data = {
    product: {
      id: "UHJvZHVjdDo1MQ==",
      name: "Bai® Sparkling Antioxidant Infusion Bogatá Blackberry",
      description:
        "If Mother Nature decided to go full mad scientist, she’d definitely fuse together these fizzy blackberry and lime flavors to create something this crazy tasty. We’re still scratching our heads trying to comprehend how 5 calories and antioxidants could combine to make this fantastic explosion of flavor. This all might be madness, but if mixing blackberry and lime is wrong, we don’t want to be right.",
      imageById: {
        url: "https://mediacdn.nauticalcommerce.app/artemis/products/nautical_bai-bubbles-bogota-blackberry-lime.png",
      },
      images: [
        {
          url: "https://mediacdn.nauticalcommerce.app/artemis/products/nautical_bai-bubbles-bogota-blackberry-lime.png",
        },
      ],
      thumbnail: {
        url: "https://mediacdn.nauticalcommerce.app/artemis/__sized__/products/nautical_bai-bubbles-bogota-blackberry-lime-thumbnail-255x255.png",
      },
    },
  };

  if (!pageJson && !isEditingOrPreviewing) {
    return <NoComponent />;
  } else {
    return <BuilderComponent model="page" content={pageJson} data={data} />;
  }
};

export default BuilderPage;
