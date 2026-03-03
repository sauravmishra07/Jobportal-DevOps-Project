module "eks" {

    source = "terraform-aws-modules/eks/aws"
    version = "19.15.1"

    cluster_name    = local.name
    cluster_endpoint_public_access =  true

    cluster_addons = {
        coredns = {
            most_recent = true
        }

        kube-proxy = {
            most_recent = true
        }

        vpc-cni = {
            most_recent = true
        }
    }
  
    vpc_id     = module.vpc.vpc_id
    subnet_ids = module.vpc.public_subnets
    control_plane_subnet_ids = module.vpc.public_subnets

    # EKS managed Node Group(s)

    eks_managed_node_group_defaults = {

        instance_types = ["m7i-flex.large"]
        capacity_type = "SPOT"

        disk_size = 30
        use_custom_node_group_name = false


        tags = {
            Name = "jobportal-dem-ng"
            Environment = "development"
            ExtraTag = "jobportal-app"
        }
    }
    
    tags = local.tags
}

data "aws_instance" "eks_node" {
 instance_tags = {
    "eks:cluster-name" = module.eks.cluster_id
 }

 filter {
   name = "instance-state-name"
   values = ["running"]
 }
  
  depends_on = [module.eks ]
}